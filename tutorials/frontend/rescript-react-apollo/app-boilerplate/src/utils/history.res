// @module("path") external dirname: string => string = "dirname"
type history
@module("history") external createBrowserHistory: unit => history = "createBrowserHistory"

let default = createBrowserHistory()
