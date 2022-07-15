import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type FriendOutput = {
  __typename?: 'FriendOutput';
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "admin" */
export type Admin = {
  __typename?: 'admin';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  friend: Friend;
  friend_id: Scalars['Int'];
  id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "admin" */
export type Admin_Aggregate = {
  __typename?: 'admin_aggregate';
  aggregate?: Maybe<Admin_Aggregate_Fields>;
  nodes: Array<Admin>;
};

/** aggregate fields of "admin" */
export type Admin_Aggregate_Fields = {
  __typename?: 'admin_aggregate_fields';
  avg?: Maybe<Admin_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Admin_Max_Fields>;
  min?: Maybe<Admin_Min_Fields>;
  stddev?: Maybe<Admin_Stddev_Fields>;
  stddev_pop?: Maybe<Admin_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Admin_Stddev_Samp_Fields>;
  sum?: Maybe<Admin_Sum_Fields>;
  var_pop?: Maybe<Admin_Var_Pop_Fields>;
  var_samp?: Maybe<Admin_Var_Samp_Fields>;
  variance?: Maybe<Admin_Variance_Fields>;
};


/** aggregate fields of "admin" */
export type Admin_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Admin_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Admin_Avg_Fields = {
  __typename?: 'admin_avg_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "admin". All fields are combined with a logical 'AND'. */
export type Admin_Bool_Exp = {
  _and?: InputMaybe<Array<Admin_Bool_Exp>>;
  _not?: InputMaybe<Admin_Bool_Exp>;
  _or?: InputMaybe<Array<Admin_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  friend?: InputMaybe<Friend_Bool_Exp>;
  friend_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "admin" */
export enum Admin_Constraint {
  /** unique or primary key constraint on columns "friend_id" */
  AdminFriendIdKey = 'admin_friend_id_key',
  /** unique or primary key constraint on columns "id" */
  AdminPkey = 'admin_pkey'
}

/** input type for incrementing numeric columns in table "admin" */
export type Admin_Inc_Input = {
  friend_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "admin" */
export type Admin_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  friend?: InputMaybe<Friend_Obj_Rel_Insert_Input>;
  friend_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Admin_Max_Fields = {
  __typename?: 'admin_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  friend_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Admin_Min_Fields = {
  __typename?: 'admin_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  friend_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "admin" */
export type Admin_Mutation_Response = {
  __typename?: 'admin_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Admin>;
};

/** input type for inserting object relation for remote table "admin" */
export type Admin_Obj_Rel_Insert_Input = {
  data: Admin_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Admin_On_Conflict>;
};

/** on_conflict condition type for table "admin" */
export type Admin_On_Conflict = {
  constraint: Admin_Constraint;
  update_columns?: Array<Admin_Update_Column>;
  where?: InputMaybe<Admin_Bool_Exp>;
};

/** Ordering options when selecting data from "admin". */
export type Admin_Order_By = {
  created_at?: InputMaybe<Order_By>;
  friend?: InputMaybe<Friend_Order_By>;
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: admin */
export type Admin_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "admin" */
export enum Admin_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FriendId = 'friend_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "admin" */
export type Admin_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  friend_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Admin_Stddev_Fields = {
  __typename?: 'admin_stddev_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Admin_Stddev_Pop_Fields = {
  __typename?: 'admin_stddev_pop_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Admin_Stddev_Samp_Fields = {
  __typename?: 'admin_stddev_samp_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Admin_Sum_Fields = {
  __typename?: 'admin_sum_fields';
  friend_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "admin" */
export enum Admin_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FriendId = 'friend_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Admin_Var_Pop_Fields = {
  __typename?: 'admin_var_pop_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Admin_Var_Samp_Fields = {
  __typename?: 'admin_var_samp_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Admin_Variance_Fields = {
  __typename?: 'admin_variance_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "friend" */
export type Friend = {
  __typename?: 'friend';
  /** An object relationship */
  admin?: Maybe<Admin>;
  id: Scalars['Int'];
  password: Scalars['String'];
  /** An array relationship */
  pizza_orders: Array<Pizza_Order>;
  /** An aggregate relationship */
  pizza_orders_aggregate: Pizza_Order_Aggregate;
  username: Scalars['String'];
};


/** columns and relationships of "friend" */
export type FriendPizza_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_Order_By>>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};


/** columns and relationships of "friend" */
export type FriendPizza_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_Order_By>>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};

/** aggregated selection of "friend" */
export type Friend_Aggregate = {
  __typename?: 'friend_aggregate';
  aggregate?: Maybe<Friend_Aggregate_Fields>;
  nodes: Array<Friend>;
};

/** aggregate fields of "friend" */
export type Friend_Aggregate_Fields = {
  __typename?: 'friend_aggregate_fields';
  avg?: Maybe<Friend_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Friend_Max_Fields>;
  min?: Maybe<Friend_Min_Fields>;
  stddev?: Maybe<Friend_Stddev_Fields>;
  stddev_pop?: Maybe<Friend_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Friend_Stddev_Samp_Fields>;
  sum?: Maybe<Friend_Sum_Fields>;
  var_pop?: Maybe<Friend_Var_Pop_Fields>;
  var_samp?: Maybe<Friend_Var_Samp_Fields>;
  variance?: Maybe<Friend_Variance_Fields>;
};


/** aggregate fields of "friend" */
export type Friend_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Friend_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Friend_Avg_Fields = {
  __typename?: 'friend_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "friend". All fields are combined with a logical 'AND'. */
export type Friend_Bool_Exp = {
  _and?: InputMaybe<Array<Friend_Bool_Exp>>;
  _not?: InputMaybe<Friend_Bool_Exp>;
  _or?: InputMaybe<Array<Friend_Bool_Exp>>;
  admin?: InputMaybe<Admin_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  pizza_orders?: InputMaybe<Pizza_Order_Bool_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "friend" */
export enum Friend_Constraint {
  /** unique or primary key constraint on columns "id" */
  FriendPkey = 'friend_pkey',
  /** unique or primary key constraint on columns "username" */
  FriendUsernameKey = 'friend_username_key'
}

/** input type for incrementing numeric columns in table "friend" */
export type Friend_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "friend" */
export type Friend_Insert_Input = {
  admin?: InputMaybe<Admin_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  pizza_orders?: InputMaybe<Pizza_Order_Arr_Rel_Insert_Input>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Friend_Max_Fields = {
  __typename?: 'friend_max_fields';
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Friend_Min_Fields = {
  __typename?: 'friend_min_fields';
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "friend" */
export type Friend_Mutation_Response = {
  __typename?: 'friend_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Friend>;
};

/** input type for inserting object relation for remote table "friend" */
export type Friend_Obj_Rel_Insert_Input = {
  data: Friend_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Friend_On_Conflict>;
};

/** on_conflict condition type for table "friend" */
export type Friend_On_Conflict = {
  constraint: Friend_Constraint;
  update_columns?: Array<Friend_Update_Column>;
  where?: InputMaybe<Friend_Bool_Exp>;
};

/** Ordering options when selecting data from "friend". */
export type Friend_Order_By = {
  admin?: InputMaybe<Admin_Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  pizza_orders_aggregate?: InputMaybe<Pizza_Order_Aggregate_Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: friend */
export type Friend_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "friend" */
export enum Friend_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "friend" */
export type Friend_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Friend_Stddev_Fields = {
  __typename?: 'friend_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Friend_Stddev_Pop_Fields = {
  __typename?: 'friend_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Friend_Stddev_Samp_Fields = {
  __typename?: 'friend_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Friend_Sum_Fields = {
  __typename?: 'friend_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "friend" */
export enum Friend_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  Username = 'username'
}

/** aggregate var_pop on columns */
export type Friend_Var_Pop_Fields = {
  __typename?: 'friend_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Friend_Var_Samp_Fields = {
  __typename?: 'friend_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Friend_Variance_Fields = {
  __typename?: 'friend_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "admin" */
  delete_admin?: Maybe<Admin_Mutation_Response>;
  /** delete single row from the table: "admin" */
  delete_admin_by_pk?: Maybe<Admin>;
  /** delete data from the table: "friend" */
  delete_friend?: Maybe<Friend_Mutation_Response>;
  /** delete single row from the table: "friend" */
  delete_friend_by_pk?: Maybe<Friend>;
  /** delete data from the table: "order_status" */
  delete_order_status?: Maybe<Order_Status_Mutation_Response>;
  /** delete single row from the table: "order_status" */
  delete_order_status_by_pk?: Maybe<Order_Status>;
  /** delete data from the table: "pizza" */
  delete_pizza?: Maybe<Pizza_Mutation_Response>;
  /** delete single row from the table: "pizza" */
  delete_pizza_by_pk?: Maybe<Pizza>;
  /** delete data from the table: "pizza_order" */
  delete_pizza_order?: Maybe<Pizza_Order_Mutation_Response>;
  /** delete single row from the table: "pizza_order" */
  delete_pizza_order_by_pk?: Maybe<Pizza_Order>;
  /** delete data from the table: "pizza_topping" */
  delete_pizza_topping?: Maybe<Pizza_Topping_Mutation_Response>;
  /** delete single row from the table: "pizza_topping" */
  delete_pizza_topping_by_pk?: Maybe<Pizza_Topping>;
  /** delete data from the table: "pizza_topping_pizza" */
  delete_pizza_topping_pizza?: Maybe<Pizza_Topping_Pizza_Mutation_Response>;
  /** delete single row from the table: "pizza_topping_pizza" */
  delete_pizza_topping_pizza_by_pk?: Maybe<Pizza_Topping_Pizza>;
  /** insert data into the table: "admin" */
  insert_admin?: Maybe<Admin_Mutation_Response>;
  /** insert a single row into the table: "admin" */
  insert_admin_one?: Maybe<Admin>;
  /** insert data into the table: "friend" */
  insert_friend?: Maybe<Friend_Mutation_Response>;
  /** insert a single row into the table: "friend" */
  insert_friend_one?: Maybe<Friend>;
  /** insert data into the table: "order_status" */
  insert_order_status?: Maybe<Order_Status_Mutation_Response>;
  /** insert a single row into the table: "order_status" */
  insert_order_status_one?: Maybe<Order_Status>;
  /** insert data into the table: "pizza" */
  insert_pizza?: Maybe<Pizza_Mutation_Response>;
  /** insert a single row into the table: "pizza" */
  insert_pizza_one?: Maybe<Pizza>;
  /** insert data into the table: "pizza_order" */
  insert_pizza_order?: Maybe<Pizza_Order_Mutation_Response>;
  /** insert a single row into the table: "pizza_order" */
  insert_pizza_order_one?: Maybe<Pizza_Order>;
  /** insert data into the table: "pizza_topping" */
  insert_pizza_topping?: Maybe<Pizza_Topping_Mutation_Response>;
  /** insert a single row into the table: "pizza_topping" */
  insert_pizza_topping_one?: Maybe<Pizza_Topping>;
  /** insert data into the table: "pizza_topping_pizza" */
  insert_pizza_topping_pizza?: Maybe<Pizza_Topping_Pizza_Mutation_Response>;
  /** insert a single row into the table: "pizza_topping_pizza" */
  insert_pizza_topping_pizza_one?: Maybe<Pizza_Topping_Pizza>;
  login?: Maybe<FriendOutput>;
  signup?: Maybe<FriendOutput>;
  /** update data of the table: "admin" */
  update_admin?: Maybe<Admin_Mutation_Response>;
  /** update single row of the table: "admin" */
  update_admin_by_pk?: Maybe<Admin>;
  /** update data of the table: "friend" */
  update_friend?: Maybe<Friend_Mutation_Response>;
  /** update single row of the table: "friend" */
  update_friend_by_pk?: Maybe<Friend>;
  /** update data of the table: "order_status" */
  update_order_status?: Maybe<Order_Status_Mutation_Response>;
  /** update single row of the table: "order_status" */
  update_order_status_by_pk?: Maybe<Order_Status>;
  /** update data of the table: "pizza" */
  update_pizza?: Maybe<Pizza_Mutation_Response>;
  /** update single row of the table: "pizza" */
  update_pizza_by_pk?: Maybe<Pizza>;
  /** update data of the table: "pizza_order" */
  update_pizza_order?: Maybe<Pizza_Order_Mutation_Response>;
  /** update single row of the table: "pizza_order" */
  update_pizza_order_by_pk?: Maybe<Pizza_Order>;
  /** update data of the table: "pizza_topping" */
  update_pizza_topping?: Maybe<Pizza_Topping_Mutation_Response>;
  /** update single row of the table: "pizza_topping" */
  update_pizza_topping_by_pk?: Maybe<Pizza_Topping>;
  /** update data of the table: "pizza_topping_pizza" */
  update_pizza_topping_pizza?: Maybe<Pizza_Topping_Pizza_Mutation_Response>;
  /** update single row of the table: "pizza_topping_pizza" */
  update_pizza_topping_pizza_by_pk?: Maybe<Pizza_Topping_Pizza>;
};


/** mutation root */
export type Mutation_RootDelete_AdminArgs = {
  where: Admin_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Admin_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_FriendArgs = {
  where: Friend_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Friend_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Order_StatusArgs = {
  where: Order_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Status_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_PizzaArgs = {
  where: Pizza_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Pizza_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Pizza_OrderArgs = {
  where: Pizza_Order_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Pizza_Order_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Pizza_ToppingArgs = {
  where: Pizza_Topping_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Pizza_Topping_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Pizza_Topping_PizzaArgs = {
  where: Pizza_Topping_Pizza_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Pizza_Topping_Pizza_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_AdminArgs = {
  objects: Array<Admin_Insert_Input>;
  on_conflict?: InputMaybe<Admin_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Admin_OneArgs = {
  object: Admin_Insert_Input;
  on_conflict?: InputMaybe<Admin_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FriendArgs = {
  objects: Array<Friend_Insert_Input>;
  on_conflict?: InputMaybe<Friend_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Friend_OneArgs = {
  object: Friend_Insert_Input;
  on_conflict?: InputMaybe<Friend_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_StatusArgs = {
  objects: Array<Order_Status_Insert_Input>;
  on_conflict?: InputMaybe<Order_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Status_OneArgs = {
  object: Order_Status_Insert_Input;
  on_conflict?: InputMaybe<Order_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PizzaArgs = {
  objects: Array<Pizza_Insert_Input>;
  on_conflict?: InputMaybe<Pizza_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pizza_OneArgs = {
  object: Pizza_Insert_Input;
  on_conflict?: InputMaybe<Pizza_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pizza_OrderArgs = {
  objects: Array<Pizza_Order_Insert_Input>;
  on_conflict?: InputMaybe<Pizza_Order_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pizza_Order_OneArgs = {
  object: Pizza_Order_Insert_Input;
  on_conflict?: InputMaybe<Pizza_Order_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pizza_ToppingArgs = {
  objects: Array<Pizza_Topping_Insert_Input>;
  on_conflict?: InputMaybe<Pizza_Topping_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pizza_Topping_OneArgs = {
  object: Pizza_Topping_Insert_Input;
  on_conflict?: InputMaybe<Pizza_Topping_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pizza_Topping_PizzaArgs = {
  objects: Array<Pizza_Topping_Pizza_Insert_Input>;
  on_conflict?: InputMaybe<Pizza_Topping_Pizza_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pizza_Topping_Pizza_OneArgs = {
  object: Pizza_Topping_Pizza_Insert_Input;
  on_conflict?: InputMaybe<Pizza_Topping_Pizza_On_Conflict>;
};


/** mutation root */
export type Mutation_RootLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


/** mutation root */
export type Mutation_RootSignupArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUpdate_AdminArgs = {
  _inc?: InputMaybe<Admin_Inc_Input>;
  _set?: InputMaybe<Admin_Set_Input>;
  where: Admin_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Admin_By_PkArgs = {
  _inc?: InputMaybe<Admin_Inc_Input>;
  _set?: InputMaybe<Admin_Set_Input>;
  pk_columns: Admin_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_FriendArgs = {
  _inc?: InputMaybe<Friend_Inc_Input>;
  _set?: InputMaybe<Friend_Set_Input>;
  where: Friend_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Friend_By_PkArgs = {
  _inc?: InputMaybe<Friend_Inc_Input>;
  _set?: InputMaybe<Friend_Set_Input>;
  pk_columns: Friend_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_StatusArgs = {
  _set?: InputMaybe<Order_Status_Set_Input>;
  where: Order_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Status_By_PkArgs = {
  _set?: InputMaybe<Order_Status_Set_Input>;
  pk_columns: Order_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PizzaArgs = {
  _inc?: InputMaybe<Pizza_Inc_Input>;
  _set?: InputMaybe<Pizza_Set_Input>;
  where: Pizza_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Pizza_By_PkArgs = {
  _inc?: InputMaybe<Pizza_Inc_Input>;
  _set?: InputMaybe<Pizza_Set_Input>;
  pk_columns: Pizza_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Pizza_OrderArgs = {
  _inc?: InputMaybe<Pizza_Order_Inc_Input>;
  _set?: InputMaybe<Pizza_Order_Set_Input>;
  where: Pizza_Order_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Pizza_Order_By_PkArgs = {
  _inc?: InputMaybe<Pizza_Order_Inc_Input>;
  _set?: InputMaybe<Pizza_Order_Set_Input>;
  pk_columns: Pizza_Order_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Pizza_ToppingArgs = {
  _inc?: InputMaybe<Pizza_Topping_Inc_Input>;
  _set?: InputMaybe<Pizza_Topping_Set_Input>;
  where: Pizza_Topping_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Pizza_Topping_By_PkArgs = {
  _inc?: InputMaybe<Pizza_Topping_Inc_Input>;
  _set?: InputMaybe<Pizza_Topping_Set_Input>;
  pk_columns: Pizza_Topping_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Pizza_Topping_PizzaArgs = {
  _inc?: InputMaybe<Pizza_Topping_Pizza_Inc_Input>;
  _set?: InputMaybe<Pizza_Topping_Pizza_Set_Input>;
  where: Pizza_Topping_Pizza_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Pizza_Topping_Pizza_By_PkArgs = {
  _inc?: InputMaybe<Pizza_Topping_Pizza_Inc_Input>;
  _set?: InputMaybe<Pizza_Topping_Pizza_Set_Input>;
  pk_columns: Pizza_Topping_Pizza_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "order_status" */
export type Order_Status = {
  __typename?: 'order_status';
  comment?: Maybe<Scalars['String']>;
  /** An array relationship */
  pizza_orders: Array<Pizza_Order>;
  /** An aggregate relationship */
  pizza_orders_aggregate: Pizza_Order_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "order_status" */
export type Order_StatusPizza_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_Order_By>>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};


/** columns and relationships of "order_status" */
export type Order_StatusPizza_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_Order_By>>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};

/** aggregated selection of "order_status" */
export type Order_Status_Aggregate = {
  __typename?: 'order_status_aggregate';
  aggregate?: Maybe<Order_Status_Aggregate_Fields>;
  nodes: Array<Order_Status>;
};

/** aggregate fields of "order_status" */
export type Order_Status_Aggregate_Fields = {
  __typename?: 'order_status_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Order_Status_Max_Fields>;
  min?: Maybe<Order_Status_Min_Fields>;
};


/** aggregate fields of "order_status" */
export type Order_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "order_status". All fields are combined with a logical 'AND'. */
export type Order_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Status_Bool_Exp>>;
  _not?: InputMaybe<Order_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Status_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  pizza_orders?: InputMaybe<Pizza_Order_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_status" */
export enum Order_Status_Constraint {
  /** unique or primary key constraint on columns "value" */
  OrderStatusPkey = 'order_status_pkey'
}

export enum Order_Status_Enum {
  Baking = 'baking',
  Gone = 'gone',
  Open = 'open',
  Ready = 'ready'
}

/** Boolean expression to compare columns of type "order_status_enum". All fields are combined with logical 'AND'. */
export type Order_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Order_Status_Enum>;
  _in?: InputMaybe<Array<Order_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Order_Status_Enum>;
  _nin?: InputMaybe<Array<Order_Status_Enum>>;
};

/** input type for inserting data into table "order_status" */
export type Order_Status_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  pizza_orders?: InputMaybe<Pizza_Order_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Order_Status_Max_Fields = {
  __typename?: 'order_status_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Order_Status_Min_Fields = {
  __typename?: 'order_status_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "order_status" */
export type Order_Status_Mutation_Response = {
  __typename?: 'order_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Order_Status>;
};

/** input type for inserting object relation for remote table "order_status" */
export type Order_Status_Obj_Rel_Insert_Input = {
  data: Order_Status_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_Status_On_Conflict>;
};

/** on_conflict condition type for table "order_status" */
export type Order_Status_On_Conflict = {
  constraint: Order_Status_Constraint;
  update_columns?: Array<Order_Status_Update_Column>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "order_status". */
export type Order_Status_Order_By = {
  comment?: InputMaybe<Order_By>;
  pizza_orders_aggregate?: InputMaybe<Pizza_Order_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order_status */
export type Order_Status_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "order_status" */
export enum Order_Status_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "order_status" */
export type Order_Status_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "order_status" */
export enum Order_Status_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** columns and relationships of "pizza" */
export type Pizza = {
  __typename?: 'pizza';
  created_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['Int'];
  original_friend: Scalars['Int'];
  /** An array relationship */
  pizza_orders: Array<Pizza_Order>;
  /** An aggregate relationship */
  pizza_orders_aggregate: Pizza_Order_Aggregate;
  /** An array relationship */
  pizza_topping_pizzas: Array<Pizza_Topping_Pizza>;
  /** An aggregate relationship */
  pizza_topping_pizzas_aggregate: Pizza_Topping_Pizza_Aggregate;
  title: Scalars['String'];
  updated_at?: Maybe<Scalars['timestamptz']>;
};


/** columns and relationships of "pizza" */
export type PizzaPizza_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_Order_By>>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};


/** columns and relationships of "pizza" */
export type PizzaPizza_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_Order_By>>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};


/** columns and relationships of "pizza" */
export type PizzaPizza_Topping_PizzasArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
};


/** columns and relationships of "pizza" */
export type PizzaPizza_Topping_Pizzas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
};

/** aggregated selection of "pizza" */
export type Pizza_Aggregate = {
  __typename?: 'pizza_aggregate';
  aggregate?: Maybe<Pizza_Aggregate_Fields>;
  nodes: Array<Pizza>;
};

/** aggregate fields of "pizza" */
export type Pizza_Aggregate_Fields = {
  __typename?: 'pizza_aggregate_fields';
  avg?: Maybe<Pizza_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Pizza_Max_Fields>;
  min?: Maybe<Pizza_Min_Fields>;
  stddev?: Maybe<Pizza_Stddev_Fields>;
  stddev_pop?: Maybe<Pizza_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Pizza_Stddev_Samp_Fields>;
  sum?: Maybe<Pizza_Sum_Fields>;
  var_pop?: Maybe<Pizza_Var_Pop_Fields>;
  var_samp?: Maybe<Pizza_Var_Samp_Fields>;
  variance?: Maybe<Pizza_Variance_Fields>;
};


/** aggregate fields of "pizza" */
export type Pizza_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Pizza_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Pizza_Avg_Fields = {
  __typename?: 'pizza_avg_fields';
  id?: Maybe<Scalars['Float']>;
  original_friend?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "pizza". All fields are combined with a logical 'AND'. */
export type Pizza_Bool_Exp = {
  _and?: InputMaybe<Array<Pizza_Bool_Exp>>;
  _not?: InputMaybe<Pizza_Bool_Exp>;
  _or?: InputMaybe<Array<Pizza_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  original_friend?: InputMaybe<Int_Comparison_Exp>;
  pizza_orders?: InputMaybe<Pizza_Order_Bool_Exp>;
  pizza_topping_pizzas?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "pizza" */
export enum Pizza_Constraint {
  /** unique or primary key constraint on columns "id" */
  PizzaPkey = 'pizza_pkey'
}

/** input type for incrementing numeric columns in table "pizza" */
export type Pizza_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  original_friend?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "pizza" */
export type Pizza_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  original_friend?: InputMaybe<Scalars['Int']>;
  pizza_orders?: InputMaybe<Pizza_Order_Arr_Rel_Insert_Input>;
  pizza_topping_pizzas?: InputMaybe<Pizza_Topping_Pizza_Arr_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Pizza_Max_Fields = {
  __typename?: 'pizza_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  original_friend?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Pizza_Min_Fields = {
  __typename?: 'pizza_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  original_friend?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "pizza" */
export type Pizza_Mutation_Response = {
  __typename?: 'pizza_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Pizza>;
};

/** input type for inserting object relation for remote table "pizza" */
export type Pizza_Obj_Rel_Insert_Input = {
  data: Pizza_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Pizza_On_Conflict>;
};

/** on_conflict condition type for table "pizza" */
export type Pizza_On_Conflict = {
  constraint: Pizza_Constraint;
  update_columns?: Array<Pizza_Update_Column>;
  where?: InputMaybe<Pizza_Bool_Exp>;
};

/** columns and relationships of "pizza_order" */
export type Pizza_Order = {
  __typename?: 'pizza_order';
  created_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  friend: Friend;
  friend_id: Scalars['Int'];
  id: Scalars['Int'];
  /** An object relationship */
  orderStatusByOrderStatus: Order_Status;
  order_status: Order_Status_Enum;
  /** An object relationship */
  pizza: Pizza;
  pizza_id: Scalars['Int'];
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregated selection of "pizza_order" */
export type Pizza_Order_Aggregate = {
  __typename?: 'pizza_order_aggregate';
  aggregate?: Maybe<Pizza_Order_Aggregate_Fields>;
  nodes: Array<Pizza_Order>;
};

/** aggregate fields of "pizza_order" */
export type Pizza_Order_Aggregate_Fields = {
  __typename?: 'pizza_order_aggregate_fields';
  avg?: Maybe<Pizza_Order_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Pizza_Order_Max_Fields>;
  min?: Maybe<Pizza_Order_Min_Fields>;
  stddev?: Maybe<Pizza_Order_Stddev_Fields>;
  stddev_pop?: Maybe<Pizza_Order_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Pizza_Order_Stddev_Samp_Fields>;
  sum?: Maybe<Pizza_Order_Sum_Fields>;
  var_pop?: Maybe<Pizza_Order_Var_Pop_Fields>;
  var_samp?: Maybe<Pizza_Order_Var_Samp_Fields>;
  variance?: Maybe<Pizza_Order_Variance_Fields>;
};


/** aggregate fields of "pizza_order" */
export type Pizza_Order_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "pizza_order" */
export type Pizza_Order_Aggregate_Order_By = {
  avg?: InputMaybe<Pizza_Order_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Pizza_Order_Max_Order_By>;
  min?: InputMaybe<Pizza_Order_Min_Order_By>;
  stddev?: InputMaybe<Pizza_Order_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Pizza_Order_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Pizza_Order_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Pizza_Order_Sum_Order_By>;
  var_pop?: InputMaybe<Pizza_Order_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Pizza_Order_Var_Samp_Order_By>;
  variance?: InputMaybe<Pizza_Order_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "pizza_order" */
export type Pizza_Order_Arr_Rel_Insert_Input = {
  data: Array<Pizza_Order_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Pizza_Order_On_Conflict>;
};

/** aggregate avg on columns */
export type Pizza_Order_Avg_Fields = {
  __typename?: 'pizza_order_avg_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "pizza_order" */
export type Pizza_Order_Avg_Order_By = {
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "pizza_order". All fields are combined with a logical 'AND'. */
export type Pizza_Order_Bool_Exp = {
  _and?: InputMaybe<Array<Pizza_Order_Bool_Exp>>;
  _not?: InputMaybe<Pizza_Order_Bool_Exp>;
  _or?: InputMaybe<Array<Pizza_Order_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  friend?: InputMaybe<Friend_Bool_Exp>;
  friend_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  orderStatusByOrderStatus?: InputMaybe<Order_Status_Bool_Exp>;
  order_status?: InputMaybe<Order_Status_Enum_Comparison_Exp>;
  pizza?: InputMaybe<Pizza_Bool_Exp>;
  pizza_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "pizza". */
export type Pizza_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  original_friend?: InputMaybe<Order_By>;
  pizza_orders_aggregate?: InputMaybe<Pizza_Order_Aggregate_Order_By>;
  pizza_topping_pizzas_aggregate?: InputMaybe<Pizza_Topping_Pizza_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** unique or primary key constraints on table "pizza_order" */
export enum Pizza_Order_Constraint {
  /** unique or primary key constraint on columns "id" */
  PizzaOrderPkey = 'pizza_order_pkey'
}

/** input type for incrementing numeric columns in table "pizza_order" */
export type Pizza_Order_Inc_Input = {
  friend_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  pizza_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "pizza_order" */
export type Pizza_Order_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  friend?: InputMaybe<Friend_Obj_Rel_Insert_Input>;
  friend_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  orderStatusByOrderStatus?: InputMaybe<Order_Status_Obj_Rel_Insert_Input>;
  order_status?: InputMaybe<Order_Status_Enum>;
  pizza?: InputMaybe<Pizza_Obj_Rel_Insert_Input>;
  pizza_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Pizza_Order_Max_Fields = {
  __typename?: 'pizza_order_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  friend_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  pizza_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "pizza_order" */
export type Pizza_Order_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Pizza_Order_Min_Fields = {
  __typename?: 'pizza_order_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  friend_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  pizza_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "pizza_order" */
export type Pizza_Order_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "pizza_order" */
export type Pizza_Order_Mutation_Response = {
  __typename?: 'pizza_order_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Pizza_Order>;
};

/** on_conflict condition type for table "pizza_order" */
export type Pizza_Order_On_Conflict = {
  constraint: Pizza_Order_Constraint;
  update_columns?: Array<Pizza_Order_Update_Column>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};

/** Ordering options when selecting data from "pizza_order". */
export type Pizza_Order_Order_By = {
  created_at?: InputMaybe<Order_By>;
  friend?: InputMaybe<Friend_Order_By>;
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  orderStatusByOrderStatus?: InputMaybe<Order_Status_Order_By>;
  order_status?: InputMaybe<Order_By>;
  pizza?: InputMaybe<Pizza_Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: pizza_order */
export type Pizza_Order_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "pizza_order" */
export enum Pizza_Order_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FriendId = 'friend_id',
  /** column name */
  Id = 'id',
  /** column name */
  OrderStatus = 'order_status',
  /** column name */
  PizzaId = 'pizza_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "pizza_order" */
export type Pizza_Order_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  friend_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  order_status?: InputMaybe<Order_Status_Enum>;
  pizza_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Pizza_Order_Stddev_Fields = {
  __typename?: 'pizza_order_stddev_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "pizza_order" */
export type Pizza_Order_Stddev_Order_By = {
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Pizza_Order_Stddev_Pop_Fields = {
  __typename?: 'pizza_order_stddev_pop_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "pizza_order" */
export type Pizza_Order_Stddev_Pop_Order_By = {
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Pizza_Order_Stddev_Samp_Fields = {
  __typename?: 'pizza_order_stddev_samp_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "pizza_order" */
export type Pizza_Order_Stddev_Samp_Order_By = {
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Pizza_Order_Sum_Fields = {
  __typename?: 'pizza_order_sum_fields';
  friend_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  pizza_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "pizza_order" */
export type Pizza_Order_Sum_Order_By = {
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
};

/** update columns of table "pizza_order" */
export enum Pizza_Order_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FriendId = 'friend_id',
  /** column name */
  Id = 'id',
  /** column name */
  OrderStatus = 'order_status',
  /** column name */
  PizzaId = 'pizza_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Pizza_Order_Var_Pop_Fields = {
  __typename?: 'pizza_order_var_pop_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "pizza_order" */
export type Pizza_Order_Var_Pop_Order_By = {
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Pizza_Order_Var_Samp_Fields = {
  __typename?: 'pizza_order_var_samp_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "pizza_order" */
export type Pizza_Order_Var_Samp_Order_By = {
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Pizza_Order_Variance_Fields = {
  __typename?: 'pizza_order_variance_fields';
  friend_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "pizza_order" */
export type Pizza_Order_Variance_Order_By = {
  friend_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: pizza */
export type Pizza_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "pizza" */
export enum Pizza_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OriginalFriend = 'original_friend',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "pizza" */
export type Pizza_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  original_friend?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Pizza_Stddev_Fields = {
  __typename?: 'pizza_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  original_friend?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Pizza_Stddev_Pop_Fields = {
  __typename?: 'pizza_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  original_friend?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Pizza_Stddev_Samp_Fields = {
  __typename?: 'pizza_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  original_friend?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Pizza_Sum_Fields = {
  __typename?: 'pizza_sum_fields';
  id?: Maybe<Scalars['Int']>;
  original_friend?: Maybe<Scalars['Int']>;
};

/** columns and relationships of "pizza_topping" */
export type Pizza_Topping = {
  __typename?: 'pizza_topping';
  available: Scalars['Boolean'];
  emoji: Scalars['String'];
  id: Scalars['Int'];
  /** An array relationship */
  pizza_topping_pizzas: Array<Pizza_Topping_Pizza>;
  /** An aggregate relationship */
  pizza_topping_pizzas_aggregate: Pizza_Topping_Pizza_Aggregate;
  title: Scalars['String'];
};


/** columns and relationships of "pizza_topping" */
export type Pizza_ToppingPizza_Topping_PizzasArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
};


/** columns and relationships of "pizza_topping" */
export type Pizza_ToppingPizza_Topping_Pizzas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
};

/** aggregated selection of "pizza_topping" */
export type Pizza_Topping_Aggregate = {
  __typename?: 'pizza_topping_aggregate';
  aggregate?: Maybe<Pizza_Topping_Aggregate_Fields>;
  nodes: Array<Pizza_Topping>;
};

/** aggregate fields of "pizza_topping" */
export type Pizza_Topping_Aggregate_Fields = {
  __typename?: 'pizza_topping_aggregate_fields';
  avg?: Maybe<Pizza_Topping_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Pizza_Topping_Max_Fields>;
  min?: Maybe<Pizza_Topping_Min_Fields>;
  stddev?: Maybe<Pizza_Topping_Stddev_Fields>;
  stddev_pop?: Maybe<Pizza_Topping_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Pizza_Topping_Stddev_Samp_Fields>;
  sum?: Maybe<Pizza_Topping_Sum_Fields>;
  var_pop?: Maybe<Pizza_Topping_Var_Pop_Fields>;
  var_samp?: Maybe<Pizza_Topping_Var_Samp_Fields>;
  variance?: Maybe<Pizza_Topping_Variance_Fields>;
};


/** aggregate fields of "pizza_topping" */
export type Pizza_Topping_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Pizza_Topping_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Pizza_Topping_Avg_Fields = {
  __typename?: 'pizza_topping_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "pizza_topping". All fields are combined with a logical 'AND'. */
export type Pizza_Topping_Bool_Exp = {
  _and?: InputMaybe<Array<Pizza_Topping_Bool_Exp>>;
  _not?: InputMaybe<Pizza_Topping_Bool_Exp>;
  _or?: InputMaybe<Array<Pizza_Topping_Bool_Exp>>;
  available?: InputMaybe<Boolean_Comparison_Exp>;
  emoji?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  pizza_topping_pizzas?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "pizza_topping" */
export enum Pizza_Topping_Constraint {
  /** unique or primary key constraint on columns "id" */
  PizzaToppingPkey = 'pizza_topping_pkey',
  /** unique or primary key constraint on columns "title" */
  PizzaToppingTitleKey = 'pizza_topping_title_key'
}

/** input type for incrementing numeric columns in table "pizza_topping" */
export type Pizza_Topping_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "pizza_topping" */
export type Pizza_Topping_Insert_Input = {
  available?: InputMaybe<Scalars['Boolean']>;
  emoji?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  pizza_topping_pizzas?: InputMaybe<Pizza_Topping_Pizza_Arr_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Pizza_Topping_Max_Fields = {
  __typename?: 'pizza_topping_max_fields';
  emoji?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Pizza_Topping_Min_Fields = {
  __typename?: 'pizza_topping_min_fields';
  emoji?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "pizza_topping" */
export type Pizza_Topping_Mutation_Response = {
  __typename?: 'pizza_topping_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Pizza_Topping>;
};

/** input type for inserting object relation for remote table "pizza_topping" */
export type Pizza_Topping_Obj_Rel_Insert_Input = {
  data: Pizza_Topping_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Pizza_Topping_On_Conflict>;
};

/** on_conflict condition type for table "pizza_topping" */
export type Pizza_Topping_On_Conflict = {
  constraint: Pizza_Topping_Constraint;
  update_columns?: Array<Pizza_Topping_Update_Column>;
  where?: InputMaybe<Pizza_Topping_Bool_Exp>;
};

/** Ordering options when selecting data from "pizza_topping". */
export type Pizza_Topping_Order_By = {
  available?: InputMaybe<Order_By>;
  emoji?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pizza_topping_pizzas_aggregate?: InputMaybe<Pizza_Topping_Pizza_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
};

/** columns and relationships of "pizza_topping_pizza" */
export type Pizza_Topping_Pizza = {
  __typename?: 'pizza_topping_pizza';
  id: Scalars['Int'];
  /** An object relationship */
  pizza: Pizza;
  pizza_id: Scalars['Int'];
  /** An object relationship */
  pizza_topping: Pizza_Topping;
  pizza_topping_id: Scalars['Int'];
};

/** aggregated selection of "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Aggregate = {
  __typename?: 'pizza_topping_pizza_aggregate';
  aggregate?: Maybe<Pizza_Topping_Pizza_Aggregate_Fields>;
  nodes: Array<Pizza_Topping_Pizza>;
};

/** aggregate fields of "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Aggregate_Fields = {
  __typename?: 'pizza_topping_pizza_aggregate_fields';
  avg?: Maybe<Pizza_Topping_Pizza_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Pizza_Topping_Pizza_Max_Fields>;
  min?: Maybe<Pizza_Topping_Pizza_Min_Fields>;
  stddev?: Maybe<Pizza_Topping_Pizza_Stddev_Fields>;
  stddev_pop?: Maybe<Pizza_Topping_Pizza_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Pizza_Topping_Pizza_Stddev_Samp_Fields>;
  sum?: Maybe<Pizza_Topping_Pizza_Sum_Fields>;
  var_pop?: Maybe<Pizza_Topping_Pizza_Var_Pop_Fields>;
  var_samp?: Maybe<Pizza_Topping_Pizza_Var_Samp_Fields>;
  variance?: Maybe<Pizza_Topping_Pizza_Variance_Fields>;
};


/** aggregate fields of "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Pizza_Topping_Pizza_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Aggregate_Order_By = {
  avg?: InputMaybe<Pizza_Topping_Pizza_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Pizza_Topping_Pizza_Max_Order_By>;
  min?: InputMaybe<Pizza_Topping_Pizza_Min_Order_By>;
  stddev?: InputMaybe<Pizza_Topping_Pizza_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Pizza_Topping_Pizza_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Pizza_Topping_Pizza_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Pizza_Topping_Pizza_Sum_Order_By>;
  var_pop?: InputMaybe<Pizza_Topping_Pizza_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Pizza_Topping_Pizza_Var_Samp_Order_By>;
  variance?: InputMaybe<Pizza_Topping_Pizza_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Arr_Rel_Insert_Input = {
  data: Array<Pizza_Topping_Pizza_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Pizza_Topping_Pizza_On_Conflict>;
};

/** aggregate avg on columns */
export type Pizza_Topping_Pizza_Avg_Fields = {
  __typename?: 'pizza_topping_pizza_avg_fields';
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
  pizza_topping_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "pizza_topping_pizza". All fields are combined with a logical 'AND'. */
export type Pizza_Topping_Pizza_Bool_Exp = {
  _and?: InputMaybe<Array<Pizza_Topping_Pizza_Bool_Exp>>;
  _not?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
  _or?: InputMaybe<Array<Pizza_Topping_Pizza_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  pizza?: InputMaybe<Pizza_Bool_Exp>;
  pizza_id?: InputMaybe<Int_Comparison_Exp>;
  pizza_topping?: InputMaybe<Pizza_Topping_Bool_Exp>;
  pizza_topping_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "pizza_topping_pizza" */
export enum Pizza_Topping_Pizza_Constraint {
  /** unique or primary key constraint on columns "id" */
  PizzaToppingPizzaPkey = 'pizza_topping_pizza_pkey'
}

/** input type for incrementing numeric columns in table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  pizza_id?: InputMaybe<Scalars['Int']>;
  pizza_topping_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  pizza?: InputMaybe<Pizza_Obj_Rel_Insert_Input>;
  pizza_id?: InputMaybe<Scalars['Int']>;
  pizza_topping?: InputMaybe<Pizza_Topping_Obj_Rel_Insert_Input>;
  pizza_topping_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Pizza_Topping_Pizza_Max_Fields = {
  __typename?: 'pizza_topping_pizza_max_fields';
  id?: Maybe<Scalars['Int']>;
  pizza_id?: Maybe<Scalars['Int']>;
  pizza_topping_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Pizza_Topping_Pizza_Min_Fields = {
  __typename?: 'pizza_topping_pizza_min_fields';
  id?: Maybe<Scalars['Int']>;
  pizza_id?: Maybe<Scalars['Int']>;
  pizza_topping_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Mutation_Response = {
  __typename?: 'pizza_topping_pizza_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Pizza_Topping_Pizza>;
};

/** on_conflict condition type for table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_On_Conflict = {
  constraint: Pizza_Topping_Pizza_Constraint;
  update_columns?: Array<Pizza_Topping_Pizza_Update_Column>;
  where?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
};

/** Ordering options when selecting data from "pizza_topping_pizza". */
export type Pizza_Topping_Pizza_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza?: InputMaybe<Pizza_Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping?: InputMaybe<Pizza_Topping_Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: pizza_topping_pizza */
export type Pizza_Topping_Pizza_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "pizza_topping_pizza" */
export enum Pizza_Topping_Pizza_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  PizzaId = 'pizza_id',
  /** column name */
  PizzaToppingId = 'pizza_topping_id'
}

/** input type for updating data in table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  pizza_id?: InputMaybe<Scalars['Int']>;
  pizza_topping_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Pizza_Topping_Pizza_Stddev_Fields = {
  __typename?: 'pizza_topping_pizza_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
  pizza_topping_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Pizza_Topping_Pizza_Stddev_Pop_Fields = {
  __typename?: 'pizza_topping_pizza_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
  pizza_topping_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Pizza_Topping_Pizza_Stddev_Samp_Fields = {
  __typename?: 'pizza_topping_pizza_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
  pizza_topping_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Pizza_Topping_Pizza_Sum_Fields = {
  __typename?: 'pizza_topping_pizza_sum_fields';
  id?: Maybe<Scalars['Int']>;
  pizza_id?: Maybe<Scalars['Int']>;
  pizza_topping_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** update columns of table "pizza_topping_pizza" */
export enum Pizza_Topping_Pizza_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  PizzaId = 'pizza_id',
  /** column name */
  PizzaToppingId = 'pizza_topping_id'
}

/** aggregate var_pop on columns */
export type Pizza_Topping_Pizza_Var_Pop_Fields = {
  __typename?: 'pizza_topping_pizza_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
  pizza_topping_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Pizza_Topping_Pizza_Var_Samp_Fields = {
  __typename?: 'pizza_topping_pizza_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
  pizza_topping_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Pizza_Topping_Pizza_Variance_Fields = {
  __typename?: 'pizza_topping_pizza_variance_fields';
  id?: Maybe<Scalars['Float']>;
  pizza_id?: Maybe<Scalars['Float']>;
  pizza_topping_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "pizza_topping_pizza" */
export type Pizza_Topping_Pizza_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  pizza_id?: InputMaybe<Order_By>;
  pizza_topping_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: pizza_topping */
export type Pizza_Topping_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "pizza_topping" */
export enum Pizza_Topping_Select_Column {
  /** column name */
  Available = 'available',
  /** column name */
  Emoji = 'emoji',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "pizza_topping" */
export type Pizza_Topping_Set_Input = {
  available?: InputMaybe<Scalars['Boolean']>;
  emoji?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Pizza_Topping_Stddev_Fields = {
  __typename?: 'pizza_topping_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Pizza_Topping_Stddev_Pop_Fields = {
  __typename?: 'pizza_topping_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Pizza_Topping_Stddev_Samp_Fields = {
  __typename?: 'pizza_topping_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Pizza_Topping_Sum_Fields = {
  __typename?: 'pizza_topping_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "pizza_topping" */
export enum Pizza_Topping_Update_Column {
  /** column name */
  Available = 'available',
  /** column name */
  Emoji = 'emoji',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title'
}

/** aggregate var_pop on columns */
export type Pizza_Topping_Var_Pop_Fields = {
  __typename?: 'pizza_topping_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Pizza_Topping_Var_Samp_Fields = {
  __typename?: 'pizza_topping_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Pizza_Topping_Variance_Fields = {
  __typename?: 'pizza_topping_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** update columns of table "pizza" */
export enum Pizza_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OriginalFriend = 'original_friend',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Pizza_Var_Pop_Fields = {
  __typename?: 'pizza_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  original_friend?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Pizza_Var_Samp_Fields = {
  __typename?: 'pizza_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  original_friend?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Pizza_Variance_Fields = {
  __typename?: 'pizza_variance_fields';
  id?: Maybe<Scalars['Float']>;
  original_friend?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "admin" */
  admin: Array<Admin>;
  /** fetch aggregated fields from the table: "admin" */
  admin_aggregate: Admin_Aggregate;
  /** fetch data from the table: "admin" using primary key columns */
  admin_by_pk?: Maybe<Admin>;
  /** fetch data from the table: "friend" */
  friend: Array<Friend>;
  /** fetch aggregated fields from the table: "friend" */
  friend_aggregate: Friend_Aggregate;
  /** fetch data from the table: "friend" using primary key columns */
  friend_by_pk?: Maybe<Friend>;
  /** fetch data from the table: "order_status" */
  order_status: Array<Order_Status>;
  /** fetch aggregated fields from the table: "order_status" */
  order_status_aggregate: Order_Status_Aggregate;
  /** fetch data from the table: "order_status" using primary key columns */
  order_status_by_pk?: Maybe<Order_Status>;
  /** fetch data from the table: "pizza" */
  pizza: Array<Pizza>;
  /** fetch aggregated fields from the table: "pizza" */
  pizza_aggregate: Pizza_Aggregate;
  /** fetch data from the table: "pizza" using primary key columns */
  pizza_by_pk?: Maybe<Pizza>;
  /** fetch data from the table: "pizza_order" */
  pizza_order: Array<Pizza_Order>;
  /** fetch aggregated fields from the table: "pizza_order" */
  pizza_order_aggregate: Pizza_Order_Aggregate;
  /** fetch data from the table: "pizza_order" using primary key columns */
  pizza_order_by_pk?: Maybe<Pizza_Order>;
  /** fetch data from the table: "pizza_topping" */
  pizza_topping: Array<Pizza_Topping>;
  /** fetch aggregated fields from the table: "pizza_topping" */
  pizza_topping_aggregate: Pizza_Topping_Aggregate;
  /** fetch data from the table: "pizza_topping" using primary key columns */
  pizza_topping_by_pk?: Maybe<Pizza_Topping>;
  /** fetch data from the table: "pizza_topping_pizza" */
  pizza_topping_pizza: Array<Pizza_Topping_Pizza>;
  /** fetch aggregated fields from the table: "pizza_topping_pizza" */
  pizza_topping_pizza_aggregate: Pizza_Topping_Pizza_Aggregate;
  /** fetch data from the table: "pizza_topping_pizza" using primary key columns */
  pizza_topping_pizza_by_pk?: Maybe<Pizza_Topping_Pizza>;
};


export type Query_RootAdminArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Query_RootAdmin_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Query_RootAdmin_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootFriendArgs = {
  distinct_on?: InputMaybe<Array<Friend_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Friend_Order_By>>;
  where?: InputMaybe<Friend_Bool_Exp>;
};


export type Query_RootFriend_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Friend_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Friend_Order_By>>;
  where?: InputMaybe<Friend_Bool_Exp>;
};


export type Query_RootFriend_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootOrder_StatusArgs = {
  distinct_on?: InputMaybe<Array<Order_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Status_Order_By>>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};


export type Query_RootOrder_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Status_Order_By>>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};


export type Query_RootOrder_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootPizzaArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Bool_Exp>;
};


export type Query_RootPizza_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Bool_Exp>;
};


export type Query_RootPizza_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPizza_OrderArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_Order_By>>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};


export type Query_RootPizza_Order_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_Order_By>>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};


export type Query_RootPizza_Order_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPizza_ToppingArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Bool_Exp>;
};


export type Query_RootPizza_Topping_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Bool_Exp>;
};


export type Query_RootPizza_Topping_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPizza_Topping_PizzaArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
};


export type Query_RootPizza_Topping_Pizza_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
};


export type Query_RootPizza_Topping_Pizza_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "admin" */
  admin: Array<Admin>;
  /** fetch aggregated fields from the table: "admin" */
  admin_aggregate: Admin_Aggregate;
  /** fetch data from the table: "admin" using primary key columns */
  admin_by_pk?: Maybe<Admin>;
  /** fetch data from the table: "friend" */
  friend: Array<Friend>;
  /** fetch aggregated fields from the table: "friend" */
  friend_aggregate: Friend_Aggregate;
  /** fetch data from the table: "friend" using primary key columns */
  friend_by_pk?: Maybe<Friend>;
  /** fetch data from the table: "order_status" */
  order_status: Array<Order_Status>;
  /** fetch aggregated fields from the table: "order_status" */
  order_status_aggregate: Order_Status_Aggregate;
  /** fetch data from the table: "order_status" using primary key columns */
  order_status_by_pk?: Maybe<Order_Status>;
  /** fetch data from the table: "pizza" */
  pizza: Array<Pizza>;
  /** fetch aggregated fields from the table: "pizza" */
  pizza_aggregate: Pizza_Aggregate;
  /** fetch data from the table: "pizza" using primary key columns */
  pizza_by_pk?: Maybe<Pizza>;
  /** fetch data from the table: "pizza_order" */
  pizza_order: Array<Pizza_Order>;
  /** fetch aggregated fields from the table: "pizza_order" */
  pizza_order_aggregate: Pizza_Order_Aggregate;
  /** fetch data from the table: "pizza_order" using primary key columns */
  pizza_order_by_pk?: Maybe<Pizza_Order>;
  /** fetch data from the table: "pizza_topping" */
  pizza_topping: Array<Pizza_Topping>;
  /** fetch aggregated fields from the table: "pizza_topping" */
  pizza_topping_aggregate: Pizza_Topping_Aggregate;
  /** fetch data from the table: "pizza_topping" using primary key columns */
  pizza_topping_by_pk?: Maybe<Pizza_Topping>;
  /** fetch data from the table: "pizza_topping_pizza" */
  pizza_topping_pizza: Array<Pizza_Topping_Pizza>;
  /** fetch aggregated fields from the table: "pizza_topping_pizza" */
  pizza_topping_pizza_aggregate: Pizza_Topping_Pizza_Aggregate;
  /** fetch data from the table: "pizza_topping_pizza" using primary key columns */
  pizza_topping_pizza_by_pk?: Maybe<Pizza_Topping_Pizza>;
};


export type Subscription_RootAdminArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Subscription_RootAdmin_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Subscription_RootAdmin_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootFriendArgs = {
  distinct_on?: InputMaybe<Array<Friend_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Friend_Order_By>>;
  where?: InputMaybe<Friend_Bool_Exp>;
};


export type Subscription_RootFriend_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Friend_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Friend_Order_By>>;
  where?: InputMaybe<Friend_Bool_Exp>;
};


export type Subscription_RootFriend_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootOrder_StatusArgs = {
  distinct_on?: InputMaybe<Array<Order_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Status_Order_By>>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};


export type Subscription_RootOrder_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Order_Status_Order_By>>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};


export type Subscription_RootOrder_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootPizzaArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Bool_Exp>;
};


export type Subscription_RootPizza_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Bool_Exp>;
};


export type Subscription_RootPizza_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPizza_OrderArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_Order_By>>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};


export type Subscription_RootPizza_Order_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Order_Order_By>>;
  where?: InputMaybe<Pizza_Order_Bool_Exp>;
};


export type Subscription_RootPizza_Order_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPizza_ToppingArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Bool_Exp>;
};


export type Subscription_RootPizza_Topping_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Bool_Exp>;
};


export type Subscription_RootPizza_Topping_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPizza_Topping_PizzaArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
};


export type Subscription_RootPizza_Topping_Pizza_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pizza_Topping_Pizza_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Pizza_Topping_Pizza_Order_By>>;
  where?: InputMaybe<Pizza_Topping_Pizza_Bool_Exp>;
};


export type Subscription_RootPizza_Topping_Pizza_By_PkArgs = {
  id: Scalars['Int'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type InsertFriendOneMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type InsertFriendOneMutation = { __typename?: 'mutation_root', insert_friend_one?: { __typename?: 'friend', id: number, username: string } | null };

export type CheckFriendQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
}>;


export type CheckFriendQuery = { __typename?: 'query_root', friend: Array<{ __typename?: 'friend', id: number, username: string, password: string }> };

export type AllOpenOrdersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AllOpenOrdersSubscription = { __typename?: 'subscription_root', pizza_order: Array<{ __typename?: 'pizza_order', id: number, order_status: Order_Status_Enum, friend: { __typename?: 'friend', username: string }, pizza: { __typename?: 'pizza', title: string, pizza_topping_pizzas: Array<{ __typename?: 'pizza_topping_pizza', pizza_topping: { __typename?: 'pizza_topping', emoji: string } }> } }> };

export type AllPizzasQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPizzasQuery = { __typename?: 'query_root', pizza: Array<{ __typename?: 'pizza', id: number, title: string, pizza_topping_pizzas: Array<{ __typename?: 'pizza_topping_pizza', pizza_topping: { __typename?: 'pizza_topping', title: string, emoji: string } }> }> };

export type CreatePizzaMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  pizza_toppings: Array<Pizza_Topping_Pizza_Insert_Input> | Pizza_Topping_Pizza_Insert_Input;
}>;


export type CreatePizzaMutation = { __typename?: 'mutation_root', insert_pizza_order_one?: { __typename?: 'pizza_order', id: number, pizza: { __typename?: 'pizza', title: string, pizza_topping_pizzas: Array<{ __typename?: 'pizza_topping_pizza', pizza_topping: { __typename?: 'pizza_topping', title: string } }> } } | null };

export type GetFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsQuery = { __typename?: 'query_root', friend: Array<{ __typename?: 'friend', username: string, id: number }> };

export type GetToppingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetToppingsQuery = { __typename?: 'query_root', pizza_topping: Array<{ __typename?: 'pizza_topping', id: number, title: string, available: boolean, emoji: string }> };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'mutation_root', login?: { __typename?: 'FriendOutput', username?: string | null, token?: string | null, id?: any | null } | null };

export type MyOpenOrdersSubscriptionVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MyOpenOrdersSubscription = { __typename?: 'subscription_root', pizza_order: Array<{ __typename?: 'pizza_order', id: number, order_status: Order_Status_Enum, pizza: { __typename?: 'pizza', id: number, title: string } }> };

export type MyPizzasQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MyPizzasQuery = { __typename?: 'query_root', pizza_order: Array<{ __typename?: 'pizza_order', pizza: { __typename?: 'pizza', id: number, title: string, pizza_topping_pizzas: Array<{ __typename?: 'pizza_topping_pizza', pizza_topping: { __typename?: 'pizza_topping', title: string, emoji: string } }> } }> };

export type OrderPizzaMutationVariables = Exact<{
  pizza_id?: InputMaybe<Scalars['Int']>;
}>;


export type OrderPizzaMutation = { __typename?: 'mutation_root', insert_pizza_order_one?: { __typename?: 'pizza_order', id: number } | null };

export type PizzaFragment = { __typename?: 'pizza', id: number, title: string, pizza_topping_pizzas: Array<{ __typename?: 'pizza_topping_pizza', pizza_topping: { __typename?: 'pizza_topping', title: string, emoji: string } }> };

export type SignupMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'mutation_root', signup?: { __typename?: 'FriendOutput', username?: string | null, token?: string | null, id?: any | null } | null };

export type UpdateOrderMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Order_Status_Enum>;
}>;


export type UpdateOrderMutation = { __typename?: 'mutation_root', update_pizza_order?: { __typename?: 'pizza_order_mutation_response', returning: Array<{ __typename?: 'pizza_order', id: number }> } | null };

export const Pizza = gql`
    fragment Pizza on pizza {
  id
  title
  pizza_topping_pizzas {
    pizza_topping {
      title
      emoji
    }
  }
}
    `;
export const InsertFriendOne = gql`
    mutation InsertFriendOne($username: String, $password: String) {
  insert_friend_one(object: {username: $username, password: $password}) {
    id
    username
  }
}
    `;
export const CheckFriend = gql`
    query CheckFriend($username: String) {
  friend(where: {username: {_eq: $username}}) {
    id
    username
    password
  }
}
    `;
export const AllOpenOrders = gql`
    subscription AllOpenOrders {
  pizza_order(where: {order_status: {_neq: gone}}, order_by: {created_at: asc}) {
    id
    order_status
    friend {
      username
    }
    pizza {
      title
      pizza_topping_pizzas {
        pizza_topping {
          emoji
        }
      }
    }
  }
}
    `;
export const AllPizzas = gql`
    query AllPizzas {
  pizza {
    ...Pizza
  }
}
    ${Pizza}`;
export const CreatePizza = gql`
    mutation CreatePizza($title: String, $pizza_toppings: [pizza_topping_pizza_insert_input!]!) {
  insert_pizza_order_one(
    object: {pizza: {data: {title: $title, pizza_topping_pizzas: {data: $pizza_toppings}}}}
  ) {
    id
    pizza {
      title
      pizza_topping_pizzas {
        pizza_topping {
          title
        }
      }
    }
  }
}
    `;
export const GetFriends = gql`
    query GetFriends {
  friend {
    username
    id
  }
}
    `;
export const GetToppings = gql`
    query GetToppings {
  pizza_topping {
    id
    title
    available
    emoji
  }
}
    `;
export const Login = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    username
    token
    id
  }
}
    `;
export const MyOpenOrders = gql`
    subscription MyOpenOrders($id: Int!) {
  pizza_order(where: {order_status: {_neq: gone}, friend_id: {_eq: $id}}) {
    id
    order_status
    pizza {
      id
      title
    }
  }
}
    `;
export const MyPizzas = gql`
    query MyPizzas($id: Int!) {
  pizza_order(where: {friend_id: {_eq: $id}}) {
    pizza {
      ...Pizza
    }
  }
}
    ${Pizza}`;
export const OrderPizza = gql`
    mutation OrderPizza($pizza_id: Int) {
  insert_pizza_order_one(object: {pizza_id: $pizza_id}) {
    id
  }
}
    `;
export const Signup = gql`
    mutation Signup($username: String!, $password: String!) {
  signup(username: $username, password: $password) {
    username
    token
    id
  }
}
    `;
export const UpdateOrder = gql`
    mutation UpdateOrder($id: Int, $status: order_status_enum) {
  update_pizza_order(where: {id: {_eq: $id}}, _set: {order_status: $status}) {
    returning {
      id
    }
  }
}
    `;
import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "query_root"
    },
    "mutationType": {
      "name": "mutation_root"
    },
    "subscriptionType": {
      "name": "subscription_root"
    },
    "types": [
      {
        "kind": "OBJECT",
        "name": "FriendOutput",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "password",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "username",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "friend",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "friend",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "friend_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "admin_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "admin",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_aggregate_fields",
        "fields": [
          {
            "name": "avg",
            "type": {
              "kind": "OBJECT",
              "name": "admin_avg_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "admin_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "admin_min_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev",
            "type": {
              "kind": "OBJECT",
              "name": "admin_stddev_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_pop",
            "type": {
              "kind": "OBJECT",
              "name": "admin_stddev_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_samp",
            "type": {
              "kind": "OBJECT",
              "name": "admin_stddev_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sum",
            "type": {
              "kind": "OBJECT",
              "name": "admin_sum_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_pop",
            "type": {
              "kind": "OBJECT",
              "name": "admin_var_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_samp",
            "type": {
              "kind": "OBJECT",
              "name": "admin_var_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "variance",
            "type": {
              "kind": "OBJECT",
              "name": "admin_variance_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_avg_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_max_fields",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_min_fields",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "admin",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_stddev_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_stddev_pop_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_stddev_samp_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_sum_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_var_pop_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_var_samp_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "admin_variance_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend",
        "fields": [
          {
            "name": "admin",
            "type": {
              "kind": "OBJECT",
              "name": "admin",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "password",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "pizza_orders",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_order",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_orders_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_order_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "username",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "friend_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "friend",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_aggregate_fields",
        "fields": [
          {
            "name": "avg",
            "type": {
              "kind": "OBJECT",
              "name": "friend_avg_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "friend_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "friend_min_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev",
            "type": {
              "kind": "OBJECT",
              "name": "friend_stddev_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_pop",
            "type": {
              "kind": "OBJECT",
              "name": "friend_stddev_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_samp",
            "type": {
              "kind": "OBJECT",
              "name": "friend_stddev_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sum",
            "type": {
              "kind": "OBJECT",
              "name": "friend_sum_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_pop",
            "type": {
              "kind": "OBJECT",
              "name": "friend_var_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_samp",
            "type": {
              "kind": "OBJECT",
              "name": "friend_var_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "variance",
            "type": {
              "kind": "OBJECT",
              "name": "friend_variance_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_avg_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_max_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "password",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "username",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_min_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "password",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "username",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "friend",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_stddev_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_stddev_pop_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_stddev_samp_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_sum_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_var_pop_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_var_samp_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "friend_variance_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "mutation_root",
        "fields": [
          {
            "name": "delete_admin",
            "type": {
              "kind": "OBJECT",
              "name": "admin_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_admin_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "admin",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_friend",
            "type": {
              "kind": "OBJECT",
              "name": "friend_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_friend_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "friend",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_order_status",
            "type": {
              "kind": "OBJECT",
              "name": "order_status_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_order_status_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "order_status",
              "ofType": null
            },
            "args": [
              {
                "name": "value",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_pizza",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_pizza_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_pizza_order",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_pizza_order_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_pizza_topping",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_pizza_topping_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_pizza_topping_pizza",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "delete_pizza_topping_pizza_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "insert_admin",
            "type": {
              "kind": "OBJECT",
              "name": "admin_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_admin_one",
            "type": {
              "kind": "OBJECT",
              "name": "admin",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_friend",
            "type": {
              "kind": "OBJECT",
              "name": "friend_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_friend_one",
            "type": {
              "kind": "OBJECT",
              "name": "friend",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_order_status",
            "type": {
              "kind": "OBJECT",
              "name": "order_status_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_order_status_one",
            "type": {
              "kind": "OBJECT",
              "name": "order_status",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_pizza",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_pizza_one",
            "type": {
              "kind": "OBJECT",
              "name": "pizza",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_pizza_order",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_pizza_order_one",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_pizza_topping",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_pizza_topping_one",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_pizza_topping_pizza",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "insert_pizza_topping_pizza_one",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza",
              "ofType": null
            },
            "args": [
              {
                "name": "object",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "on_conflict",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "login",
            "type": {
              "kind": "OBJECT",
              "name": "FriendOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "username",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "signup",
            "type": {
              "kind": "OBJECT",
              "name": "FriendOutput",
              "ofType": null
            },
            "args": [
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "username",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_admin",
            "type": {
              "kind": "OBJECT",
              "name": "admin_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_admin_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "admin",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_friend",
            "type": {
              "kind": "OBJECT",
              "name": "friend_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_friend_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "friend",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_order_status",
            "type": {
              "kind": "OBJECT",
              "name": "order_status_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_order_status_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "order_status",
              "ofType": null
            },
            "args": [
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_pizza",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_pizza_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_pizza_order",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_pizza_order_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_pizza_topping",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_pizza_topping_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_pizza_topping_pizza",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_mutation_response",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "update_pizza_topping_pizza_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza",
              "ofType": null
            },
            "args": [
              {
                "name": "_inc",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "_set",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "pk_columns",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "order_status",
        "fields": [
          {
            "name": "comment",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_orders",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_order",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_orders_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_order_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "order_status_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "order_status_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "order_status",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "order_status_aggregate_fields",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "order_status_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "order_status_min_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "order_status_max_fields",
        "fields": [
          {
            "name": "comment",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "order_status_min_fields",
        "fields": [
          {
            "name": "comment",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "order_status_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "order_status",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "pizza_orders",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_order",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_orders_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_order_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_pizzas",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_topping_pizza",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_pizzas_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_topping_pizza_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_aggregate_fields",
        "fields": [
          {
            "name": "avg",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_avg_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_min_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_stddev_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_pop",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_stddev_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_samp",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_stddev_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sum",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_sum_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_pop",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_var_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_samp",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_var_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "variance",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_variance_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_avg_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_max_fields",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_min_fields",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "friend",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "friend",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "friend_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "orderStatusByOrderStatus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "order_status",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "order_status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "pizza",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_order",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_aggregate_fields",
        "fields": [
          {
            "name": "avg",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_avg_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_min_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_stddev_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_pop",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_stddev_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_samp",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_stddev_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sum",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_sum_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_pop",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_var_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_samp",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_var_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "variance",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order_variance_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_avg_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_max_fields",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_min_fields",
        "fields": [
          {
            "name": "created_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updated_at",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_order",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_stddev_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_stddev_pop_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_stddev_samp_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_sum_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_var_pop_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_var_samp_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_order_variance_fields",
        "fields": [
          {
            "name": "friend_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_stddev_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_stddev_pop_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_stddev_samp_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_sum_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping",
        "fields": [
          {
            "name": "available",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "emoji",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "pizza_topping_pizzas",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_topping_pizza",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_pizzas_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_topping_pizza_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_topping",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_aggregate_fields",
        "fields": [
          {
            "name": "avg",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_avg_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_min_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_stddev_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_pop",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_stddev_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_samp",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_stddev_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sum",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_sum_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_pop",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_var_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_samp",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_var_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "variance",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_variance_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_avg_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_max_fields",
        "fields": [
          {
            "name": "emoji",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_min_fields",
        "fields": [
          {
            "name": "emoji",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_topping",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "pizza",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "pizza_topping",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_topping",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_aggregate",
        "fields": [
          {
            "name": "aggregate",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_aggregate_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_topping_pizza",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_aggregate_fields",
        "fields": [
          {
            "name": "avg",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_avg_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "columns",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "max",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_max_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "min",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_min_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_stddev_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_pop",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_stddev_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "stddev_samp",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_stddev_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sum",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_sum_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_pop",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_var_pop_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "var_samp",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_var_samp_fields",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "variance",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza_variance_fields",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_avg_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_max_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_min_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_mutation_response",
        "fields": [
          {
            "name": "affected_rows",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "returning",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_topping_pizza",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_stddev_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_stddev_pop_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_stddev_samp_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_sum_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_var_pop_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_var_samp_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_pizza_variance_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pizza_topping_id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_stddev_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_stddev_pop_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_stddev_samp_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_sum_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_var_pop_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_var_samp_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_topping_variance_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_var_pop_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_var_samp_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "pizza_variance_fields",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "original_friend",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "query_root",
        "fields": [
          {
            "name": "admin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "admin",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "admin_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "admin_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "admin_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "admin",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "friend",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "friend",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "friend_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "friend_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "friend_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "friend",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "order_status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "order_status",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "order_status_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "order_status_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "order_status_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "order_status",
              "ofType": null
            },
            "args": [
              {
                "name": "value",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "pizza",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "pizza_order",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_order",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_order_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_order_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_order_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "pizza_topping",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_topping",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_topping_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "pizza_topping_pizza",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_topping_pizza",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_pizza_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_topping_pizza_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_pizza_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "subscription_root",
        "fields": [
          {
            "name": "admin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "admin",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "admin_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "admin_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "admin_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "admin",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "friend",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "friend",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "friend_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "friend_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "friend_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "friend",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "order_status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "order_status",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "order_status_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "order_status_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "order_status_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "order_status",
              "ofType": null
            },
            "args": [
              {
                "name": "value",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "pizza",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "pizza_order",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_order",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_order_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_order_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_order_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_order",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "pizza_topping",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_topping",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_topping_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "pizza_topping_pizza",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "pizza_topping_pizza",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_pizza_aggregate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "pizza_topping_pizza_aggregate",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "distinct_on",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "order_by",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pizza_topping_pizza_by_pk",
            "type": {
              "kind": "OBJECT",
              "name": "pizza_topping_pizza",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;
export const PizzaFragmentDoc = gql`
    fragment Pizza on pizza {
  id
  title
  pizza_topping_pizzas {
    pizza_topping {
      title
      emoji
    }
  }
}
    `;
export const InsertFriendOneDocument = gql`
    mutation InsertFriendOne($username: String, $password: String) {
  insert_friend_one(object: {username: $username, password: $password}) {
    id
    username
  }
}
    `;

export function useInsertFriendOneMutation() {
  return Urql.useMutation<InsertFriendOneMutation, InsertFriendOneMutationVariables>(InsertFriendOneDocument);
};
export const CheckFriendDocument = gql`
    query CheckFriend($username: String) {
  friend(where: {username: {_eq: $username}}) {
    id
    username
    password
  }
}
    `;

export function useCheckFriendQuery(options?: Omit<Urql.UseQueryArgs<CheckFriendQueryVariables>, 'query'>) {
  return Urql.useQuery<CheckFriendQuery>({ query: CheckFriendDocument, ...options });
};
export const AllOpenOrdersDocument = gql`
    subscription AllOpenOrders {
  pizza_order(where: {order_status: {_neq: gone}}, order_by: {created_at: asc}) {
    id
    order_status
    friend {
      username
    }
    pizza {
      title
      pizza_topping_pizzas {
        pizza_topping {
          emoji
        }
      }
    }
  }
}
    `;

export function useAllOpenOrdersSubscription<TData = AllOpenOrdersSubscription>(options: Omit<Urql.UseSubscriptionArgs<AllOpenOrdersSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<AllOpenOrdersSubscription, TData>) {
  return Urql.useSubscription<AllOpenOrdersSubscription, TData, AllOpenOrdersSubscriptionVariables>({ query: AllOpenOrdersDocument, ...options }, handler);
};
export const AllPizzasDocument = gql`
    query AllPizzas {
  pizza {
    ...Pizza
  }
}
    ${PizzaFragmentDoc}`;

export function useAllPizzasQuery(options?: Omit<Urql.UseQueryArgs<AllPizzasQueryVariables>, 'query'>) {
  return Urql.useQuery<AllPizzasQuery>({ query: AllPizzasDocument, ...options });
};
export const CreatePizzaDocument = gql`
    mutation CreatePizza($title: String, $pizza_toppings: [pizza_topping_pizza_insert_input!]!) {
  insert_pizza_order_one(
    object: {pizza: {data: {title: $title, pizza_topping_pizzas: {data: $pizza_toppings}}}}
  ) {
    id
    pizza {
      title
      pizza_topping_pizzas {
        pizza_topping {
          title
        }
      }
    }
  }
}
    `;

export function useCreatePizzaMutation() {
  return Urql.useMutation<CreatePizzaMutation, CreatePizzaMutationVariables>(CreatePizzaDocument);
};
export const GetFriendsDocument = gql`
    query GetFriends {
  friend {
    username
    id
  }
}
    `;

export function useGetFriendsQuery(options?: Omit<Urql.UseQueryArgs<GetFriendsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFriendsQuery>({ query: GetFriendsDocument, ...options });
};
export const GetToppingsDocument = gql`
    query GetToppings {
  pizza_topping {
    id
    title
    available
    emoji
  }
}
    `;

export function useGetToppingsQuery(options?: Omit<Urql.UseQueryArgs<GetToppingsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetToppingsQuery>({ query: GetToppingsDocument, ...options });
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    username
    token
    id
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const MyOpenOrdersDocument = gql`
    subscription MyOpenOrders($id: Int!) {
  pizza_order(where: {order_status: {_neq: gone}, friend_id: {_eq: $id}}) {
    id
    order_status
    pizza {
      id
      title
    }
  }
}
    `;

export function useMyOpenOrdersSubscription<TData = MyOpenOrdersSubscription>(options: Omit<Urql.UseSubscriptionArgs<MyOpenOrdersSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MyOpenOrdersSubscription, TData>) {
  return Urql.useSubscription<MyOpenOrdersSubscription, TData, MyOpenOrdersSubscriptionVariables>({ query: MyOpenOrdersDocument, ...options }, handler);
};
export const MyPizzasDocument = gql`
    query MyPizzas($id: Int!) {
  pizza_order(where: {friend_id: {_eq: $id}}) {
    pizza {
      ...Pizza
    }
  }
}
    ${PizzaFragmentDoc}`;

export function useMyPizzasQuery(options: Omit<Urql.UseQueryArgs<MyPizzasQueryVariables>, 'query'>) {
  return Urql.useQuery<MyPizzasQuery>({ query: MyPizzasDocument, ...options });
};
export const OrderPizzaDocument = gql`
    mutation OrderPizza($pizza_id: Int) {
  insert_pizza_order_one(object: {pizza_id: $pizza_id}) {
    id
  }
}
    `;

export function useOrderPizzaMutation() {
  return Urql.useMutation<OrderPizzaMutation, OrderPizzaMutationVariables>(OrderPizzaDocument);
};
export const SignupDocument = gql`
    mutation Signup($username: String!, $password: String!) {
  signup(username: $username, password: $password) {
    username
    token
    id
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($id: Int, $status: order_status_enum) {
  update_pizza_order(where: {id: {_eq: $id}}, _set: {order_status: $status}) {
    returning {
      id
    }
  }
}
    `;

export function useUpdateOrderMutation() {
  return Urql.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument);
};