import 'package:app_final/config/client.dart';
import 'package:app_final/screens/tabs/dashboard/feeds.dart';
import 'package:app_final/screens/tabs/dashboard/online.dart';
import 'package:app_final/screens/tabs/dashboard/todos.dart';
import 'package:app_final/services/shared_preferences_service.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class Dashboard extends StatelessWidget {
  Dashboard({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String>(
      future: sharedPreferenceService.token,
      builder: (BuildContext ctx, AsyncSnapshot<String> snapshot) {
        Widget children = Text('Something went wrong!');
        if (snapshot.hasError) {
          children = Text(snapshot.error);
        }
        if (snapshot.hasData) {
          children = GraphQLProvider(
            client: Config.initailizeClient(snapshot.data),
            child: CacheProvider(
              child: DefaultTabController(
                length: 3,
                child: Scaffold(
                  appBar: AppBar(
                    automaticallyImplyLeading: false,
                    centerTitle: true,
                    title: Text(
                      "ToDo App",
                    ),
                    actions: <Widget>[
                      IconButton(
                        icon: Icon(Icons.exit_to_app),
                        onPressed: () async {
                          sharedPreferenceService.clearToken();
                          Navigator.pushReplacementNamed(ctx, "/login");
                        },
                      ),
                    ],
                  ),
                  bottomNavigationBar: new TabBar(
                    tabs: [
                      Tab(
                        text: "Todos",
                        icon: new Icon(Icons.edit),
                      ),
                      Tab(
                        text: "Feeds",
                        icon: new Icon(Icons.message),
                      ),
                      Tab(
                        text: "Online",
                        icon: new Icon(Icons.people),
                      ),
                    ],
                    labelColor: Colors.black,
                    unselectedLabelColor: Colors.grey,
                    indicatorSize: TabBarIndicatorSize.label,
                    indicatorPadding: EdgeInsets.all(5.0),
                    indicatorColor: Colors.blue,
                  ),
                  body: TabBarView(
                    physics: NeverScrollableScrollPhysics(),
                    children: [
                      Todos(),
                      Feeds(),
                      Online(),
                    ],
                  ),
                ),
              ),
            ),
          );
        }

        return children;
      },
    );
  }
}
