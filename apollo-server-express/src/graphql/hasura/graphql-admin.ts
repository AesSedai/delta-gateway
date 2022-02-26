import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  timestamp: any;
  timestamptz: any;
  uuid: string;
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

/** columns and relationships of "authors" */
export type Authors = {
  __typename: 'authors';
  /** fetch data from the table: "books" */
  books: Array<Books>;
  /** An aggregate relationship */
  books_aggregate: Books_Aggregate;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "authors" */
export type AuthorsBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


/** columns and relationships of "authors" */
export type AuthorsBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};

/** aggregated selection of "authors" */
export type Authors_Aggregate = {
  __typename: 'authors_aggregate';
  aggregate?: Maybe<Authors_Aggregate_Fields>;
  nodes: Array<Authors>;
};

/** aggregate fields of "authors" */
export type Authors_Aggregate_Fields = {
  __typename: 'authors_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Authors_Max_Fields>;
  min?: Maybe<Authors_Min_Fields>;
};


/** aggregate fields of "authors" */
export type Authors_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Authors_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "authors". All fields are combined with a logical 'AND'. */
export type Authors_Bool_Exp = {
  _and?: InputMaybe<Array<Authors_Bool_Exp>>;
  _not?: InputMaybe<Authors_Bool_Exp>;
  _or?: InputMaybe<Array<Authors_Bool_Exp>>;
  books?: InputMaybe<Books_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "authors" */
export enum Authors_Constraint {
  /** unique or primary key constraint */
  AuthorsPkey = 'authors_pkey'
}

/** input type for inserting data into table "authors" */
export type Authors_Insert_Input = {
  books?: InputMaybe<Books_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Authors_Max_Fields = {
  __typename: 'authors_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Authors_Min_Fields = {
  __typename: 'authors_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "authors" */
export type Authors_Mutation_Response = {
  __typename: 'authors_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Authors>;
};

/** input type for inserting object relation for remote table "authors" */
export type Authors_Obj_Rel_Insert_Input = {
  data: Authors_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Authors_On_Conflict>;
};

/** on conflict condition type for table "authors" */
export type Authors_On_Conflict = {
  constraint: Authors_Constraint;
  update_columns?: Array<Authors_Update_Column>;
  where?: InputMaybe<Authors_Bool_Exp>;
};

/** Ordering options when selecting data from "authors". */
export type Authors_Order_By = {
  books_aggregate?: InputMaybe<Books_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: authors */
export type Authors_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "authors" */
export enum Authors_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "authors" */
export type Authors_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "authors" */
export enum Authors_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "books" */
export type Books = {
  __typename: 'books';
  /** An object relationship */
  author?: Maybe<Authors>;
  author_id?: Maybe<Scalars['uuid']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  isbn?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "books" */
export type Books_Aggregate = {
  __typename: 'books_aggregate';
  aggregate?: Maybe<Books_Aggregate_Fields>;
  nodes: Array<Books>;
};

/** aggregate fields of "books" */
export type Books_Aggregate_Fields = {
  __typename: 'books_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Books_Max_Fields>;
  min?: Maybe<Books_Min_Fields>;
};


/** aggregate fields of "books" */
export type Books_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Books_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "books" */
export type Books_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Books_Max_Order_By>;
  min?: InputMaybe<Books_Min_Order_By>;
};

/** input type for inserting array relation for remote table "books" */
export type Books_Arr_Rel_Insert_Input = {
  data: Array<Books_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Books_On_Conflict>;
};

/** Boolean expression to filter rows from the table "books". All fields are combined with a logical 'AND'. */
export type Books_Bool_Exp = {
  _and?: InputMaybe<Array<Books_Bool_Exp>>;
  _not?: InputMaybe<Books_Bool_Exp>;
  _or?: InputMaybe<Array<Books_Bool_Exp>>;
  author?: InputMaybe<Authors_Bool_Exp>;
  author_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isbn?: InputMaybe<String_Comparison_Exp>;
  published_at?: InputMaybe<Timestamp_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "books" */
export enum Books_Constraint {
  /** unique or primary key constraint */
  BooksPkey = 'books_pkey'
}

/** input type for inserting data into table "books" */
export type Books_Insert_Input = {
  author?: InputMaybe<Authors_Obj_Rel_Insert_Input>;
  author_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isbn?: InputMaybe<Scalars['String']>;
  published_at?: InputMaybe<Scalars['timestamp']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Books_Max_Fields = {
  __typename: 'books_max_fields';
  author_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  isbn?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "books" */
export type Books_Max_Order_By = {
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isbn?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Books_Min_Fields = {
  __typename: 'books_min_fields';
  author_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  isbn?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "books" */
export type Books_Min_Order_By = {
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isbn?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "books" */
export type Books_Mutation_Response = {
  __typename: 'books_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Books>;
};

/** on conflict condition type for table "books" */
export type Books_On_Conflict = {
  constraint: Books_Constraint;
  update_columns?: Array<Books_Update_Column>;
  where?: InputMaybe<Books_Bool_Exp>;
};

/** Ordering options when selecting data from "books". */
export type Books_Order_By = {
  author?: InputMaybe<Authors_Order_By>;
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isbn?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: books */
export type Books_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "books" */
export enum Books_Select_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Isbn = 'isbn',
  /** column name */
  PublishedAt = 'published_at',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "books" */
export type Books_Set_Input = {
  author_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isbn?: InputMaybe<Scalars['String']>;
  published_at?: InputMaybe<Scalars['timestamp']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "books" */
export enum Books_Update_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Isbn = 'isbn',
  /** column name */
  PublishedAt = 'published_at',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "events" */
export type Events = {
  __typename: 'events';
  connection_id: Scalars['Int'];
  event_data: Scalars['jsonb'];
  event_number: Scalars['Int'];
  event_time: Scalars['timestamptz'];
  is_error: Scalars['Boolean'];
  label: Scalars['String'];
  latency?: Maybe<Scalars['Int']>;
  operation_id: Scalars['Int'];
};


/** columns and relationships of "events" */
export type EventsEvent_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename: 'events_aggregate';
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename: 'events_aggregate_fields';
  avg?: Maybe<Events_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
  stddev?: Maybe<Events_Stddev_Fields>;
  stddev_pop?: Maybe<Events_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Events_Stddev_Samp_Fields>;
  sum?: Maybe<Events_Sum_Fields>;
  var_pop?: Maybe<Events_Var_Pop_Fields>;
  var_samp?: Maybe<Events_Var_Samp_Fields>;
  variance?: Maybe<Events_Variance_Fields>;
};


/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Events_Append_Input = {
  event_data?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Events_Avg_Fields = {
  __typename: 'events_avg_fields';
  connection_id?: Maybe<Scalars['Float']>;
  event_number?: Maybe<Scalars['Float']>;
  latency?: Maybe<Scalars['Float']>;
  operation_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  connection_id?: InputMaybe<Int_Comparison_Exp>;
  event_data?: InputMaybe<Jsonb_Comparison_Exp>;
  event_number?: InputMaybe<Int_Comparison_Exp>;
  event_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_error?: InputMaybe<Boolean_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  latency?: InputMaybe<Int_Comparison_Exp>;
  operation_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint */
  EventsLabelConnectionIdOperationIdEventNumberUnique = 'events_label_connection_id_operation_id_event_number_unique'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Events_Delete_At_Path_Input = {
  event_data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Events_Delete_Elem_Input = {
  event_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Events_Delete_Key_Input = {
  event_data?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "events" */
export type Events_Inc_Input = {
  connection_id?: InputMaybe<Scalars['Int']>;
  event_number?: InputMaybe<Scalars['Int']>;
  latency?: InputMaybe<Scalars['Int']>;
  operation_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  connection_id?: InputMaybe<Scalars['Int']>;
  event_data?: InputMaybe<Scalars['jsonb']>;
  event_number?: InputMaybe<Scalars['Int']>;
  event_time?: InputMaybe<Scalars['timestamptz']>;
  is_error?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  latency?: InputMaybe<Scalars['Int']>;
  operation_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename: 'events_max_fields';
  connection_id?: Maybe<Scalars['Int']>;
  event_number?: Maybe<Scalars['Int']>;
  event_time?: Maybe<Scalars['timestamptz']>;
  label?: Maybe<Scalars['String']>;
  latency?: Maybe<Scalars['Int']>;
  operation_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename: 'events_min_fields';
  connection_id?: Maybe<Scalars['Int']>;
  event_number?: Maybe<Scalars['Int']>;
  event_time?: Maybe<Scalars['timestamptz']>;
  label?: Maybe<Scalars['String']>;
  latency?: Maybe<Scalars['Int']>;
  operation_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "events" */
export type Events_Mutation_Response = {
  __typename: 'events_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Events>;
};

/** on conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns?: Array<Events_Update_Column>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  connection_id?: InputMaybe<Order_By>;
  event_data?: InputMaybe<Order_By>;
  event_number?: InputMaybe<Order_By>;
  event_time?: InputMaybe<Order_By>;
  is_error?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  latency?: InputMaybe<Order_By>;
  operation_id?: InputMaybe<Order_By>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Events_Prepend_Input = {
  event_data?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  ConnectionId = 'connection_id',
  /** column name */
  EventData = 'event_data',
  /** column name */
  EventNumber = 'event_number',
  /** column name */
  EventTime = 'event_time',
  /** column name */
  IsError = 'is_error',
  /** column name */
  Label = 'label',
  /** column name */
  Latency = 'latency',
  /** column name */
  OperationId = 'operation_id'
}

/** input type for updating data in table "events" */
export type Events_Set_Input = {
  connection_id?: InputMaybe<Scalars['Int']>;
  event_data?: InputMaybe<Scalars['jsonb']>;
  event_number?: InputMaybe<Scalars['Int']>;
  event_time?: InputMaybe<Scalars['timestamptz']>;
  is_error?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  latency?: InputMaybe<Scalars['Int']>;
  operation_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Events_Stddev_Fields = {
  __typename: 'events_stddev_fields';
  connection_id?: Maybe<Scalars['Float']>;
  event_number?: Maybe<Scalars['Float']>;
  latency?: Maybe<Scalars['Float']>;
  operation_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Events_Stddev_Pop_Fields = {
  __typename: 'events_stddev_pop_fields';
  connection_id?: Maybe<Scalars['Float']>;
  event_number?: Maybe<Scalars['Float']>;
  latency?: Maybe<Scalars['Float']>;
  operation_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Events_Stddev_Samp_Fields = {
  __typename: 'events_stddev_samp_fields';
  connection_id?: Maybe<Scalars['Float']>;
  event_number?: Maybe<Scalars['Float']>;
  latency?: Maybe<Scalars['Float']>;
  operation_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Events_Sum_Fields = {
  __typename: 'events_sum_fields';
  connection_id?: Maybe<Scalars['Int']>;
  event_number?: Maybe<Scalars['Int']>;
  latency?: Maybe<Scalars['Int']>;
  operation_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "events" */
export enum Events_Update_Column {
  /** column name */
  ConnectionId = 'connection_id',
  /** column name */
  EventData = 'event_data',
  /** column name */
  EventNumber = 'event_number',
  /** column name */
  EventTime = 'event_time',
  /** column name */
  IsError = 'is_error',
  /** column name */
  Label = 'label',
  /** column name */
  Latency = 'latency',
  /** column name */
  OperationId = 'operation_id'
}

/** aggregate var_pop on columns */
export type Events_Var_Pop_Fields = {
  __typename: 'events_var_pop_fields';
  connection_id?: Maybe<Scalars['Float']>;
  event_number?: Maybe<Scalars['Float']>;
  latency?: Maybe<Scalars['Float']>;
  operation_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Events_Var_Samp_Fields = {
  __typename: 'events_var_samp_fields';
  connection_id?: Maybe<Scalars['Float']>;
  event_number?: Maybe<Scalars['Float']>;
  latency?: Maybe<Scalars['Float']>;
  operation_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Events_Variance_Fields = {
  __typename: 'events_variance_fields';
  connection_id?: Maybe<Scalars['Float']>;
  event_number?: Maybe<Scalars['Float']>;
  latency?: Maybe<Scalars['Float']>;
  operation_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "history.authors" */
export type History_Authors = {
  __typename: 'history_authors';
  /** An array relationship */
  books: Array<History_Books>;
  /** An aggregate relationship */
  books_aggregate: History_Books_Aggregate;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
  valid_from?: Maybe<Scalars['timestamptz']>;
  valid_to?: Maybe<Scalars['timestamptz']>;
};


/** columns and relationships of "history.authors" */
export type History_AuthorsBooksArgs = {
  distinct_on?: InputMaybe<Array<History_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Books_Order_By>>;
  where?: InputMaybe<History_Books_Bool_Exp>;
};


/** columns and relationships of "history.authors" */
export type History_AuthorsBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<History_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Books_Order_By>>;
  where?: InputMaybe<History_Books_Bool_Exp>;
};

/** aggregated selection of "history.authors" */
export type History_Authors_Aggregate = {
  __typename: 'history_authors_aggregate';
  aggregate?: Maybe<History_Authors_Aggregate_Fields>;
  nodes: Array<History_Authors>;
};

/** aggregate fields of "history.authors" */
export type History_Authors_Aggregate_Fields = {
  __typename: 'history_authors_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<History_Authors_Max_Fields>;
  min?: Maybe<History_Authors_Min_Fields>;
};


/** aggregate fields of "history.authors" */
export type History_Authors_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<History_Authors_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "history.authors" */
export type History_Authors_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<History_Authors_Max_Order_By>;
  min?: InputMaybe<History_Authors_Min_Order_By>;
};

/** input type for inserting array relation for remote table "history.authors" */
export type History_Authors_Arr_Rel_Insert_Input = {
  data: Array<History_Authors_Insert_Input>;
};

/** Boolean expression to filter rows from the table "history.authors". All fields are combined with a logical 'AND'. */
export type History_Authors_Bool_Exp = {
  _and?: InputMaybe<Array<History_Authors_Bool_Exp>>;
  _not?: InputMaybe<History_Authors_Bool_Exp>;
  _or?: InputMaybe<Array<History_Authors_Bool_Exp>>;
  books?: InputMaybe<History_Books_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  valid_from?: InputMaybe<Timestamptz_Comparison_Exp>;
  valid_to?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** input type for inserting data into table "history.authors" */
export type History_Authors_Insert_Input = {
  books?: InputMaybe<History_Books_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  valid_from?: InputMaybe<Scalars['timestamptz']>;
  valid_to?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type History_Authors_Max_Fields = {
  __typename: 'history_authors_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  valid_from?: Maybe<Scalars['timestamptz']>;
  valid_to?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "history.authors" */
export type History_Authors_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  valid_from?: InputMaybe<Order_By>;
  valid_to?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type History_Authors_Min_Fields = {
  __typename: 'history_authors_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  valid_from?: Maybe<Scalars['timestamptz']>;
  valid_to?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "history.authors" */
export type History_Authors_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  valid_from?: InputMaybe<Order_By>;
  valid_to?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "history.authors" */
export type History_Authors_Mutation_Response = {
  __typename: 'history_authors_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<History_Authors>;
};

/** Ordering options when selecting data from "history.authors". */
export type History_Authors_Order_By = {
  books_aggregate?: InputMaybe<History_Books_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  valid_from?: InputMaybe<Order_By>;
  valid_to?: InputMaybe<Order_By>;
};

/** select columns of table "history.authors" */
export enum History_Authors_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  ValidFrom = 'valid_from',
  /** column name */
  ValidTo = 'valid_to'
}

/** input type for updating data in table "history.authors" */
export type History_Authors_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  valid_from?: InputMaybe<Scalars['timestamptz']>;
  valid_to?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "history.books" */
export type History_Books = {
  __typename: 'history_books';
  /** An array relationship */
  author: Array<History_Authors>;
  /** An aggregate relationship */
  author_aggregate: History_Authors_Aggregate;
  author_id?: Maybe<Scalars['uuid']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  isbn?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
  valid_from?: Maybe<Scalars['timestamptz']>;
  valid_to?: Maybe<Scalars['timestamptz']>;
};


/** columns and relationships of "history.books" */
export type History_BooksAuthorArgs = {
  distinct_on?: InputMaybe<Array<History_Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Authors_Order_By>>;
  where?: InputMaybe<History_Authors_Bool_Exp>;
};


/** columns and relationships of "history.books" */
export type History_BooksAuthor_AggregateArgs = {
  distinct_on?: InputMaybe<Array<History_Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Authors_Order_By>>;
  where?: InputMaybe<History_Authors_Bool_Exp>;
};

/** aggregated selection of "history.books" */
export type History_Books_Aggregate = {
  __typename: 'history_books_aggregate';
  aggregate?: Maybe<History_Books_Aggregate_Fields>;
  nodes: Array<History_Books>;
};

/** aggregate fields of "history.books" */
export type History_Books_Aggregate_Fields = {
  __typename: 'history_books_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<History_Books_Max_Fields>;
  min?: Maybe<History_Books_Min_Fields>;
};


/** aggregate fields of "history.books" */
export type History_Books_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<History_Books_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "history.books" */
export type History_Books_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<History_Books_Max_Order_By>;
  min?: InputMaybe<History_Books_Min_Order_By>;
};

/** input type for inserting array relation for remote table "history.books" */
export type History_Books_Arr_Rel_Insert_Input = {
  data: Array<History_Books_Insert_Input>;
};

/** Boolean expression to filter rows from the table "history.books". All fields are combined with a logical 'AND'. */
export type History_Books_Bool_Exp = {
  _and?: InputMaybe<Array<History_Books_Bool_Exp>>;
  _not?: InputMaybe<History_Books_Bool_Exp>;
  _or?: InputMaybe<Array<History_Books_Bool_Exp>>;
  author?: InputMaybe<History_Authors_Bool_Exp>;
  author_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isbn?: InputMaybe<String_Comparison_Exp>;
  published_at?: InputMaybe<Timestamp_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  valid_from?: InputMaybe<Timestamptz_Comparison_Exp>;
  valid_to?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** input type for inserting data into table "history.books" */
export type History_Books_Insert_Input = {
  author?: InputMaybe<History_Authors_Arr_Rel_Insert_Input>;
  author_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isbn?: InputMaybe<Scalars['String']>;
  published_at?: InputMaybe<Scalars['timestamp']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  valid_from?: InputMaybe<Scalars['timestamptz']>;
  valid_to?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type History_Books_Max_Fields = {
  __typename: 'history_books_max_fields';
  author_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  isbn?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  valid_from?: Maybe<Scalars['timestamptz']>;
  valid_to?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "history.books" */
export type History_Books_Max_Order_By = {
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isbn?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  valid_from?: InputMaybe<Order_By>;
  valid_to?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type History_Books_Min_Fields = {
  __typename: 'history_books_min_fields';
  author_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  isbn?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  valid_from?: Maybe<Scalars['timestamptz']>;
  valid_to?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "history.books" */
export type History_Books_Min_Order_By = {
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isbn?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  valid_from?: InputMaybe<Order_By>;
  valid_to?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "history.books" */
export type History_Books_Mutation_Response = {
  __typename: 'history_books_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<History_Books>;
};

/** Ordering options when selecting data from "history.books". */
export type History_Books_Order_By = {
  author_aggregate?: InputMaybe<History_Authors_Aggregate_Order_By>;
  author_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isbn?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  valid_from?: InputMaybe<Order_By>;
  valid_to?: InputMaybe<Order_By>;
};

/** select columns of table "history.books" */
export enum History_Books_Select_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Isbn = 'isbn',
  /** column name */
  PublishedAt = 'published_at',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  ValidFrom = 'valid_from',
  /** column name */
  ValidTo = 'valid_to'
}

/** input type for updating data in table "history.books" */
export type History_Books_Set_Input = {
  author_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isbn?: InputMaybe<Scalars['String']>;
  published_at?: InputMaybe<Scalars['timestamp']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  valid_from?: InputMaybe<Scalars['timestamptz']>;
  valid_to?: InputMaybe<Scalars['timestamptz']>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename: 'mutation_root';
  /** delete data from the table: "authors" */
  delete_authors?: Maybe<Authors_Mutation_Response>;
  /** delete single row from the table: "authors" */
  delete_authors_by_pk?: Maybe<Authors>;
  /** delete data from the table: "books" */
  delete_books?: Maybe<Books_Mutation_Response>;
  /** delete single row from the table: "books" */
  delete_books_by_pk?: Maybe<Books>;
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>;
  /** delete data from the table: "history.authors" */
  delete_history_authors?: Maybe<History_Authors_Mutation_Response>;
  /** delete data from the table: "history.books" */
  delete_history_books?: Maybe<History_Books_Mutation_Response>;
  /** insert data into the table: "authors" */
  insert_authors?: Maybe<Authors_Mutation_Response>;
  /** insert a single row into the table: "authors" */
  insert_authors_one?: Maybe<Authors>;
  /** insert data into the table: "books" */
  insert_books?: Maybe<Books_Mutation_Response>;
  /** insert a single row into the table: "books" */
  insert_books_one?: Maybe<Books>;
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>;
  /** insert data into the table: "history.authors" */
  insert_history_authors?: Maybe<History_Authors_Mutation_Response>;
  /** insert a single row into the table: "history.authors" */
  insert_history_authors_one?: Maybe<History_Authors>;
  /** insert data into the table: "history.books" */
  insert_history_books?: Maybe<History_Books_Mutation_Response>;
  /** insert a single row into the table: "history.books" */
  insert_history_books_one?: Maybe<History_Books>;
  /** update data of the table: "authors" */
  update_authors?: Maybe<Authors_Mutation_Response>;
  /** update single row of the table: "authors" */
  update_authors_by_pk?: Maybe<Authors>;
  /** update data of the table: "books" */
  update_books?: Maybe<Books_Mutation_Response>;
  /** update single row of the table: "books" */
  update_books_by_pk?: Maybe<Books>;
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>;
  /** update data of the table: "history.authors" */
  update_history_authors?: Maybe<History_Authors_Mutation_Response>;
  /** update data of the table: "history.books" */
  update_history_books?: Maybe<History_Books_Mutation_Response>;
};


/** mutation root */
export type Mutation_RootDelete_AuthorsArgs = {
  where: Authors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Authors_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_BooksArgs = {
  where: Books_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Books_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_History_AuthorsArgs = {
  where: History_Authors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_History_BooksArgs = {
  where: History_Books_Bool_Exp;
};


/** mutation root */
export type Mutation_RootInsert_AuthorsArgs = {
  objects: Array<Authors_Insert_Input>;
  on_conflict?: InputMaybe<Authors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Authors_OneArgs = {
  object: Authors_Insert_Input;
  on_conflict?: InputMaybe<Authors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BooksArgs = {
  objects: Array<Books_Insert_Input>;
  on_conflict?: InputMaybe<Books_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Books_OneArgs = {
  object: Books_Insert_Input;
  on_conflict?: InputMaybe<Books_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_History_AuthorsArgs = {
  objects: Array<History_Authors_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_History_Authors_OneArgs = {
  object: History_Authors_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_History_BooksArgs = {
  objects: Array<History_Books_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_History_Books_OneArgs = {
  object: History_Books_Insert_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AuthorsArgs = {
  _set?: InputMaybe<Authors_Set_Input>;
  where: Authors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Authors_By_PkArgs = {
  _set?: InputMaybe<Authors_Set_Input>;
  pk_columns: Authors_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_BooksArgs = {
  _set?: InputMaybe<Books_Set_Input>;
  where: Books_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Books_By_PkArgs = {
  _set?: InputMaybe<Books_Set_Input>;
  pk_columns: Books_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _append?: InputMaybe<Events_Append_Input>;
  _delete_at_path?: InputMaybe<Events_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Events_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Events_Delete_Key_Input>;
  _inc?: InputMaybe<Events_Inc_Input>;
  _prepend?: InputMaybe<Events_Prepend_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_History_AuthorsArgs = {
  _set?: InputMaybe<History_Authors_Set_Input>;
  where: History_Authors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_History_BooksArgs = {
  _set?: InputMaybe<History_Books_Set_Input>;
  where: History_Books_Bool_Exp;
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

export type Query_Root = {
  __typename: 'query_root';
  /** fetch data from the table: "authors" */
  authors: Array<Authors>;
  /** fetch aggregated fields from the table: "authors" */
  authors_aggregate: Authors_Aggregate;
  /** fetch data from the table: "authors" using primary key columns */
  authors_by_pk?: Maybe<Authors>;
  /** fetch data from the table: "books" */
  books: Array<Books>;
  /** An aggregate relationship */
  books_aggregate: Books_Aggregate;
  /** fetch data from the table: "books" using primary key columns */
  books_by_pk?: Maybe<Books>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "history.authors" */
  history_authors: Array<History_Authors>;
  /** fetch aggregated fields from the table: "history.authors" */
  history_authors_aggregate: History_Authors_Aggregate;
  /** fetch data from the table: "history.books" */
  history_books: Array<History_Books>;
  /** fetch aggregated fields from the table: "history.books" */
  history_books_aggregate: History_Books_Aggregate;
};


export type Query_RootAuthorsArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type Query_RootAuthors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type Query_RootAuthors_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type Query_RootBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type Query_RootBooks_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootHistory_AuthorsArgs = {
  distinct_on?: InputMaybe<Array<History_Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Authors_Order_By>>;
  where?: InputMaybe<History_Authors_Bool_Exp>;
};


export type Query_RootHistory_Authors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<History_Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Authors_Order_By>>;
  where?: InputMaybe<History_Authors_Bool_Exp>;
};


export type Query_RootHistory_BooksArgs = {
  distinct_on?: InputMaybe<Array<History_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Books_Order_By>>;
  where?: InputMaybe<History_Books_Bool_Exp>;
};


export type Query_RootHistory_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<History_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Books_Order_By>>;
  where?: InputMaybe<History_Books_Bool_Exp>;
};

export type Subscription_Root = {
  __typename: 'subscription_root';
  /** fetch data from the table: "authors" */
  authors: Array<Authors>;
  /** fetch aggregated fields from the table: "authors" */
  authors_aggregate: Authors_Aggregate;
  /** fetch data from the table: "authors" using primary key columns */
  authors_by_pk?: Maybe<Authors>;
  /** fetch data from the table: "books" */
  books: Array<Books>;
  /** An aggregate relationship */
  books_aggregate: Books_Aggregate;
  /** fetch data from the table: "books" using primary key columns */
  books_by_pk?: Maybe<Books>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "history.authors" */
  history_authors: Array<History_Authors>;
  /** fetch aggregated fields from the table: "history.authors" */
  history_authors_aggregate: History_Authors_Aggregate;
  /** fetch data from the table: "history.books" */
  history_books: Array<History_Books>;
  /** fetch aggregated fields from the table: "history.books" */
  history_books_aggregate: History_Books_Aggregate;
};


export type Subscription_RootAuthorsArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type Subscription_RootAuthors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type Subscription_RootAuthors_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type Subscription_RootBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type Subscription_RootBooks_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootHistory_AuthorsArgs = {
  distinct_on?: InputMaybe<Array<History_Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Authors_Order_By>>;
  where?: InputMaybe<History_Authors_Bool_Exp>;
};


export type Subscription_RootHistory_Authors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<History_Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Authors_Order_By>>;
  where?: InputMaybe<History_Authors_Bool_Exp>;
};


export type Subscription_RootHistory_BooksArgs = {
  distinct_on?: InputMaybe<Array<History_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Books_Order_By>>;
  where?: InputMaybe<History_Books_Bool_Exp>;
};


export type Subscription_RootHistory_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<History_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<History_Books_Order_By>>;
  where?: InputMaybe<History_Books_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
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

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type Seed_AuthorsMutationVariables = Exact<{
  authors: Array<Authors_Insert_Input> | Authors_Insert_Input;
}>;


export type Seed_AuthorsMutation = { __typename: 'mutation_root', insert_authors?: { __typename: 'authors_mutation_response', affected_rows: number } | null | undefined };

export type Remove_AuthorsMutationVariables = Exact<{ [key: string]: never; }>;


export type Remove_AuthorsMutation = { __typename: 'mutation_root', delete_authors?: { __typename: 'authors_mutation_response', affected_rows: number } | null | undefined };

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsQuery = { __typename: 'query_root', authors: Array<{ __typename: 'authors', id: string, updated_at: any, name?: string | null | undefined, books: Array<{ __typename: 'books', id: string, updated_at: any, isbn?: string | null | undefined, title?: string | null | undefined }> }> };

export type GetAuthorsRandomQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset: Scalars['Int'];
}>;


export type GetAuthorsRandomQuery = { __typename: 'query_root', authors: Array<{ __typename: 'authors', updated_at: any, name?: string | null | undefined, books: Array<{ __typename: 'books', updated_at: any, isbn?: string | null | undefined, title?: string | null | undefined }> }> };

export type GetAuthorHistoryQueryVariables = Exact<{
  ts: Scalars['timestamptz'];
  limit: Scalars['Int'];
}>;


export type GetAuthorHistoryQuery = { __typename: 'query_root', history_authors: Array<{ __typename: 'history_authors', id: string, name?: string | null | undefined, updated_at: any, books: Array<{ __typename: 'history_books', id: string, title?: string | null | undefined, isbn?: string | null | undefined, updated_at: any }> }> };


export const Seed_AuthorsDocument = gql`
    mutation seed_authors($authors: [authors_insert_input!]!) {
  insert_authors(objects: $authors) {
    affected_rows
  }
}
    `;
export const Remove_AuthorsDocument = gql`
    mutation remove_authors {
  delete_authors(where: {}) {
    affected_rows
  }
}
    `;
export const GetAuthorsDocument = gql`
    query getAuthors {
  authors {
    __typename
    id
    updated_at
    name
    books {
      __typename
      id
      updated_at
      isbn
      title
    }
  }
}
    `;
export const GetAuthorsRandomDocument = gql`
    query getAuthorsRandom($limit: Int = 25, $offset: Int!) {
  authors(limit: $limit, offset: $offset) {
    __typename
    updated_at
    name
    books {
      __typename
      updated_at
      isbn
      title
    }
  }
}
    `;
export const GetAuthorHistoryDocument = gql`
    query getAuthorHistory($ts: timestamptz!, $limit: Int!) {
  history_authors(
    limit: $limit
    order_by: {name: asc}
    where: {valid_from: {_lte: $ts}, _or: [{valid_to: {_is_null: true}}, {valid_to: {_gt: $ts}}]}
  ) {
    __typename
    id
    name
    updated_at
    books(
      order_by: {title: asc}
      where: {valid_from: {_lte: $ts}, _or: [{valid_to: {_is_null: true}}, {valid_to: {_gt: $ts}}]}
    ) {
      __typename
      id
      title
      isbn
      updated_at
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    seed_authors(variables: Seed_AuthorsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Seed_AuthorsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Seed_AuthorsMutation>(Seed_AuthorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'seed_authors');
    },
    remove_authors(variables?: Remove_AuthorsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Remove_AuthorsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Remove_AuthorsMutation>(Remove_AuthorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'remove_authors');
    },
    getAuthors(variables?: GetAuthorsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAuthorsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAuthorsQuery>(GetAuthorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAuthors');
    },
    getAuthorsRandom(variables: GetAuthorsRandomQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAuthorsRandomQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAuthorsRandomQuery>(GetAuthorsRandomDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAuthorsRandom');
    },
    getAuthorHistory(variables: GetAuthorHistoryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAuthorHistoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAuthorHistoryQuery>(GetAuthorHistoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAuthorHistory');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;