from flask import Flask
from flask_pydantic import validate
from typing import Generic, TypeVar
from pydantic import BaseModel
from pydantic.generics import GenericModel
from action.loginTypes import LoginResponse, loginArgs


ActionInput = TypeVar("ActionInput", bound=BaseModel)


class ActionName(BaseModel):
    name: str


class ActionPayload(GenericModel, Generic[ActionInput]):
    action: ActionName
    input: ActionInput
    request_query: str
    session_variables: dict[str, str]


app = Flask(__name__)


@app.route("/action", methods=["POST"])
@validate()
def actionHandler(action: ActionPayload[loginArgs]) -> LoginResponse:
    return LoginResponse(AccessToken="<sample value>")
