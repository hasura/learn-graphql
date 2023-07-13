---
title: "Querying an LLM"
metaTitle: "Handle events | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

You can also set up LLM queries as an Action on a remote source. This is great because we can define access control for
Actions as well, and any data that we query will pass through our data access control we set up earlier. In the scenario
below, we want to enable our API to serve natural-language queries to our LLM model. This way, a user can ask a question
such as "Who would be best in a zombie scenario?" and our API can return a generative AI response that's backed up by
its training on the data in our database.

**As before, if you've already set up the server, you can skip to [Step 3](#step3:createanactiononthehasuraconsole).
However, we'll go into detail below for each step.**

## Step 1: Write the LLM query

We'll need to write a function that takes in a GraphQL request and returns a prompt for the LLM. The code below creates
a `get_prompt()` function that takes in a GraphQL request and returns a prompt for the LLM. The prompt is a string that
contains the user's query and the content of the resumes that match the query.

```python
def get_prompt(request):
    print(request)
    user_query = request['input']['user_query']

     # Add authenticated session variables as headers along with the admin secret
    gql_headers = request['session_variables']
    gql_headers['x-hasura-admin-secret'] = 'secret'

    # Create a GraphQL client with the request transport
    transport = RequestsHTTPTransport(
        url=GRAPHQL_ENDPOINT, headers=gql_headers)
    client = Client(transport=transport)

    # Send the GraphQL request
    gql_query = gql("""
            query getItems($user_query: text!) {
                Resume(where: { vector: { near_text: $user_query}}, limit: 3) {
                    content
                    application_id
                }
            }
        """)
    result = client.execute(gql_query, variable_values={
                            'user_query': user_query})
    # resumes = result['data']['Resume']
    resumes = result["Resume"]

    prompt = """
    You are a helpful Question Answering bot.
    You are provided with content from a few resumes and a question.
    Answer the question based on the content of the resumes.
    Provide your reasoning.

    Question: {question}"""
    prompt += user_query

    for resume in resumes:
        prompt += "Resume:"
        prompt += resume["content"]
        prompt += "with Application ID: "
        prompt += resume["application_id"]
        prompt += "\n"

    return prompt
```

## Step 2: Define the API

Then, we'll need to define the API that will handle the request. We'll use the `query_llm()` function below to handle
the request. This function takes in a GraphQL request and returns a response from the LLM with the `text-davinci-003`
model.

```python
def query_llm(request, headers):
    llm = OpenAI(model="text-davinci-003",
                 openai_api_key=os.environ['OPENAI_APIKEY'])
    prompt = get_prompt(request)
    chain = LLMChain(llm=llm, prompt=PromptTemplate.from_template(prompt))
    return str(chain.run(
        {"question":request["input"]["user_query"]}
        ))

```

## Step 3: Create an Action on the Hasura Console

On the `Actions` page, click `Create` and enter the following `Action Definition`:

```graphql
type Query {
  QueryLLM(user_query: String!): String
}
```

Then, clear out the Type Configuration and provide the handler via this URL:

`http://host.docker.internal:8400/query_llm`

**Note: If your're using Linux, you'll need to replace `host.docker.internal` with `localhost`.**

Finally, we'll need to transform the request options as we did with our Event Trigger. Our API is expecting a `POST`
request, so we'll set that as the `Request Method` before clicking `Create Action` at the bottom of the page.

## Step 4: Execute the Action

For now, turn off our added `manager` and `role` request headers. Now you can use `QueryLLM` as a type in your GraphQL
API 🎉

![Authorized LLM call](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/authorized_llm_call.png)
