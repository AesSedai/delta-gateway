import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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

export type LiveSubscription = {
  __typename: 'LiveSubscription';
  delta: Delta;
  id: Scalars['String'];
  query?: Maybe<Subscription_Root>;
};


export type LiveSubscriptionDeltaArgs = {
  lastUpdated?: InputMaybe<Scalars['timestamptz']>;
};

/** mutation root */
export type Mutation = {
  __typename: 'Mutation';
  /** delete data from the table: "authors" */
  delete_authors?: Maybe<Authors_Mutation_Response>;
  /** delete single row from the table: "authors" */
  delete_authors_by_pk?: Maybe<Authors>;
  /** delete data from the table: "books" */
  delete_books?: Maybe<Books_Mutation_Response>;
  /** delete single row from the table: "books" */
  delete_books_by_pk?: Maybe<Books>;
  /** delete data from the table: "cache" */
  delete_cache?: Maybe<Cache_Mutation_Response>;
  /** delete single row from the table: "cache" */
  delete_cache_by_pk?: Maybe<Cache>;
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>;
  /** insert data into the table: "authors" */
  insert_authors?: Maybe<Authors_Mutation_Response>;
  /** insert a single row into the table: "authors" */
  insert_authors_one?: Maybe<Authors>;
  /** insert data into the table: "books" */
  insert_books?: Maybe<Books_Mutation_Response>;
  /** insert a single row into the table: "books" */
  insert_books_one?: Maybe<Books>;
  /** insert data into the table: "cache" */
  insert_cache?: Maybe<Cache_Mutation_Response>;
  /** insert a single row into the table: "cache" */
  insert_cache_one?: Maybe<Cache>;
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>;
  /** update data of the table: "authors" */
  update_authors?: Maybe<Authors_Mutation_Response>;
  /** update single row of the table: "authors" */
  update_authors_by_pk?: Maybe<Authors>;
  /** update data of the table: "books" */
  update_books?: Maybe<Books_Mutation_Response>;
  /** update single row of the table: "books" */
  update_books_by_pk?: Maybe<Books>;
  /** update data of the table: "cache" */
  update_cache?: Maybe<Cache_Mutation_Response>;
  /** update single row of the table: "cache" */
  update_cache_by_pk?: Maybe<Cache>;
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>;
};


/** mutation root */
export type MutationDelete_AuthorsArgs = {
  where: Authors_Bool_Exp;
};


/** mutation root */
export type MutationDelete_Authors_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationDelete_BooksArgs = {
  where: Books_Bool_Exp;
};


/** mutation root */
export type MutationDelete_Books_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationDelete_CacheArgs = {
  where: Cache_Bool_Exp;
};


/** mutation root */
export type MutationDelete_Cache_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationDelete_EventsArgs = {
  where: Events_Bool_Exp;
};


/** mutation root */
export type MutationInsert_AuthorsArgs = {
  objects: Array<Authors_Insert_Input>;
  on_conflict?: InputMaybe<Authors_On_Conflict>;
};


/** mutation root */
export type MutationInsert_Authors_OneArgs = {
  object: Authors_Insert_Input;
  on_conflict?: InputMaybe<Authors_On_Conflict>;
};


/** mutation root */
export type MutationInsert_BooksArgs = {
  objects: Array<Books_Insert_Input>;
  on_conflict?: InputMaybe<Books_On_Conflict>;
};


/** mutation root */
export type MutationInsert_Books_OneArgs = {
  object: Books_Insert_Input;
  on_conflict?: InputMaybe<Books_On_Conflict>;
};


/** mutation root */
export type MutationInsert_CacheArgs = {
  objects: Array<Cache_Insert_Input>;
  on_conflict?: InputMaybe<Cache_On_Conflict>;
};


/** mutation root */
export type MutationInsert_Cache_OneArgs = {
  object: Cache_Insert_Input;
  on_conflict?: InputMaybe<Cache_On_Conflict>;
};


/** mutation root */
export type MutationInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type MutationInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type MutationUpdate_AuthorsArgs = {
  _set?: InputMaybe<Authors_Set_Input>;
  where: Authors_Bool_Exp;
};


/** mutation root */
export type MutationUpdate_Authors_By_PkArgs = {
  _set?: InputMaybe<Authors_Set_Input>;
  pk_columns: Authors_Pk_Columns_Input;
};


/** mutation root */
export type MutationUpdate_BooksArgs = {
  _set?: InputMaybe<Books_Set_Input>;
  where: Books_Bool_Exp;
};


/** mutation root */
export type MutationUpdate_Books_By_PkArgs = {
  _set?: InputMaybe<Books_Set_Input>;
  pk_columns: Books_Pk_Columns_Input;
};


/** mutation root */
export type MutationUpdate_CacheArgs = {
  _append?: InputMaybe<Cache_Append_Input>;
  _delete_at_path?: InputMaybe<Cache_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Cache_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Cache_Delete_Key_Input>;
  _prepend?: InputMaybe<Cache_Prepend_Input>;
  _set?: InputMaybe<Cache_Set_Input>;
  where: Cache_Bool_Exp;
};


/** mutation root */
export type MutationUpdate_Cache_By_PkArgs = {
  _append?: InputMaybe<Cache_Append_Input>;
  _delete_at_path?: InputMaybe<Cache_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Cache_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Cache_Delete_Key_Input>;
  _prepend?: InputMaybe<Cache_Prepend_Input>;
  _set?: InputMaybe<Cache_Set_Input>;
  pk_columns: Cache_Pk_Columns_Input;
};


/** mutation root */
export type MutationUpdate_EventsArgs = {
  _append?: InputMaybe<Events_Append_Input>;
  _delete_at_path?: InputMaybe<Events_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Events_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Events_Delete_Key_Input>;
  _inc?: InputMaybe<Events_Inc_Input>;
  _prepend?: InputMaybe<Events_Prepend_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};

export type Query = {
  __typename: 'Query';
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
  /** fetch data from the table: "cache" */
  cache: Array<Cache>;
  /** fetch aggregated fields from the table: "cache" */
  cache_aggregate: Cache_Aggregate;
  /** fetch data from the table: "cache" using primary key columns */
  cache_by_pk?: Maybe<Cache>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
};


export type QueryAuthorsArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type QueryAuthors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type QueryAuthors_By_PkArgs = {
  id: Scalars['uuid'];
};


export type QueryBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type QueryBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type QueryBooks_By_PkArgs = {
  id: Scalars['uuid'];
};


export type QueryCacheArgs = {
  distinct_on?: InputMaybe<Array<Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cache_Order_By>>;
  where?: InputMaybe<Cache_Bool_Exp>;
};


export type QueryCache_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cache_Order_By>>;
  where?: InputMaybe<Cache_Bool_Exp>;
};


export type QueryCache_By_PkArgs = {
  id: Scalars['uuid'];
};


export type QueryEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type QueryEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
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

export type Subscription = {
  __typename: 'Subscription';
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
  /** fetch data from the table: "cache" */
  cache: Array<Cache>;
  /** fetch aggregated fields from the table: "cache" */
  cache_aggregate: Cache_Aggregate;
  /** fetch data from the table: "cache" using primary key columns */
  cache_by_pk?: Maybe<Cache>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  live: LiveSubscription;
};


export type SubscriptionAuthorsArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type SubscriptionAuthors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Authors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Authors_Order_By>>;
  where?: InputMaybe<Authors_Bool_Exp>;
};


export type SubscriptionAuthors_By_PkArgs = {
  id: Scalars['uuid'];
};


export type SubscriptionBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type SubscriptionBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type SubscriptionBooks_By_PkArgs = {
  id: Scalars['uuid'];
};


export type SubscriptionCacheArgs = {
  distinct_on?: InputMaybe<Array<Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cache_Order_By>>;
  where?: InputMaybe<Cache_Bool_Exp>;
};


export type SubscriptionCache_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cache_Order_By>>;
  where?: InputMaybe<Cache_Bool_Exp>;
};


export type SubscriptionCache_By_PkArgs = {
  id: Scalars['uuid'];
};


export type SubscriptionEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type SubscriptionEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
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
  author: Authors;
  author_id: Scalars['uuid'];
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

/** columns and relationships of "cache" */
export type Cache = {
  __typename: 'cache';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  lastUpdated?: Maybe<Scalars['timestamptz']>;
  patch: Scalars['jsonb'];
  query: Scalars['String'];
  result: Scalars['jsonb'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "cache" */
export type CachePatchArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "cache" */
export type CacheResultArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "cache" */
export type Cache_Aggregate = {
  __typename: 'cache_aggregate';
  aggregate?: Maybe<Cache_Aggregate_Fields>;
  nodes: Array<Cache>;
};

/** aggregate fields of "cache" */
export type Cache_Aggregate_Fields = {
  __typename: 'cache_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Cache_Max_Fields>;
  min?: Maybe<Cache_Min_Fields>;
};


/** aggregate fields of "cache" */
export type Cache_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Cache_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Cache_Append_Input = {
  patch?: InputMaybe<Scalars['jsonb']>;
  result?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "cache". All fields are combined with a logical 'AND'. */
export type Cache_Bool_Exp = {
  _and?: InputMaybe<Array<Cache_Bool_Exp>>;
  _not?: InputMaybe<Cache_Bool_Exp>;
  _or?: InputMaybe<Array<Cache_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  lastUpdated?: InputMaybe<Timestamptz_Comparison_Exp>;
  patch?: InputMaybe<Jsonb_Comparison_Exp>;
  query?: InputMaybe<String_Comparison_Exp>;
  result?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "cache" */
export enum Cache_Constraint {
  /** unique or primary key constraint */
  CachePkey = 'cache_pkey',
  /** unique or primary key constraint */
  CacheQueryLastupdatedUnique = 'cache_query_lastupdated_unique'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Cache_Delete_At_Path_Input = {
  patch?: InputMaybe<Array<Scalars['String']>>;
  result?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Cache_Delete_Elem_Input = {
  patch?: InputMaybe<Scalars['Int']>;
  result?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Cache_Delete_Key_Input = {
  patch?: InputMaybe<Scalars['String']>;
  result?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "cache" */
export type Cache_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastUpdated?: InputMaybe<Scalars['timestamptz']>;
  patch?: InputMaybe<Scalars['jsonb']>;
  query?: InputMaybe<Scalars['String']>;
  result?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Cache_Max_Fields = {
  __typename: 'cache_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  lastUpdated?: Maybe<Scalars['timestamptz']>;
  query?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Cache_Min_Fields = {
  __typename: 'cache_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  lastUpdated?: Maybe<Scalars['timestamptz']>;
  query?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "cache" */
export type Cache_Mutation_Response = {
  __typename: 'cache_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Cache>;
};

/** on conflict condition type for table "cache" */
export type Cache_On_Conflict = {
  constraint: Cache_Constraint;
  update_columns?: Array<Cache_Update_Column>;
  where?: InputMaybe<Cache_Bool_Exp>;
};

/** Ordering options when selecting data from "cache". */
export type Cache_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  patch?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: cache */
export type Cache_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Cache_Prepend_Input = {
  patch?: InputMaybe<Scalars['jsonb']>;
  result?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "cache" */
export enum Cache_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastUpdated = 'lastUpdated',
  /** column name */
  Patch = 'patch',
  /** column name */
  Query = 'query',
  /** column name */
  Result = 'result',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "cache" */
export type Cache_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastUpdated?: InputMaybe<Scalars['timestamptz']>;
  patch?: InputMaybe<Scalars['jsonb']>;
  query?: InputMaybe<Scalars['String']>;
  result?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "cache" */
export enum Cache_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastUpdated = 'lastUpdated',
  /** column name */
  Patch = 'patch',
  /** column name */
  Query = 'query',
  /** column name */
  Result = 'result',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Delta = {
  __typename: 'delta';
  hash: Scalars['String'];
  lastUpdated: Scalars['timestamptz'];
  patch: Scalars['String'];
};

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
  /** fetch data from the table: "cache" */
  cache: Array<Cache>;
  /** fetch aggregated fields from the table: "cache" */
  cache_aggregate: Cache_Aggregate;
  /** fetch data from the table: "cache" using primary key columns */
  cache_by_pk?: Maybe<Cache>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
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


export type Subscription_RootCacheArgs = {
  distinct_on?: InputMaybe<Array<Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cache_Order_By>>;
  where?: InputMaybe<Cache_Bool_Exp>;
};


export type Subscription_RootCache_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cache_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Cache_Order_By>>;
  where?: InputMaybe<Cache_Bool_Exp>;
};


export type Subscription_RootCache_By_PkArgs = {
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

export type UpdateAuthorMutationVariables = Exact<{
  id: Scalars['uuid'];
  name: Scalars['String'];
}>;


export type UpdateAuthorMutation = { __typename: 'Mutation', update_authors_by_pk?: { __typename: 'authors', id: any } | null | undefined };

export type AddBookMutationVariables = Exact<{
  book: Books_Insert_Input;
}>;


export type AddBookMutation = { __typename: 'Mutation', insert_books_one?: { __typename: 'books', id: any } | null | undefined };

export type DeleteBookMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteBookMutation = { __typename: 'Mutation', delete_books_by_pk?: { __typename: 'books', id: any } | null | undefined };

export type UpdateBookMutationVariables = Exact<{
  id: Scalars['uuid'];
  title: Scalars['String'];
}>;


export type UpdateBookMutation = { __typename: 'Mutation', update_books_by_pk?: { __typename: 'books', id: any } | null | undefined };

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsQuery = { __typename: 'Query', authors: Array<{ __typename: 'authors', id: any, name?: string | null | undefined, updated_at: any, books: Array<{ __typename: 'books', id: any, title?: string | null | undefined, isbn?: string | null | undefined, updated_at: any }> }> };

export type AuthorsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AuthorsSubscription = { __typename: 'Subscription', authors: Array<{ __typename: 'authors', id: any, name?: string | null | undefined, updated_at: any, books: Array<{ __typename: 'books', id: any, title?: string | null | undefined, isbn?: string | null | undefined, updated_at: any }> }> };

export type AuthorsLiveSubscriptionVariables = Exact<{
  lastUpdated: Scalars['timestamptz'];
}>;


export type AuthorsLiveSubscription = { __typename: 'Subscription', live: { __typename: 'LiveSubscription', id: string, query?: { __typename: 'subscription_root', authors: Array<{ __typename: 'authors', id: any, name?: string | null | undefined, updated_at: any, books: Array<{ __typename: 'books', id: any, title?: string | null | undefined, isbn?: string | null | undefined, updated_at: any }> }> } | null | undefined, delta: { __typename: 'delta', lastUpdated: any, patch: string, hash: string } } };


export const UpdateAuthorDocument = gql`
    mutation updateAuthor($id: uuid!, $name: String!) {
  update_authors_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
    id
  }
}
    `;
export type UpdateAuthorMutationFn = Apollo.MutationFunction<UpdateAuthorMutation, UpdateAuthorMutationVariables>;

/**
 * __useUpdateAuthorMutation__
 *
 * To run a mutation, you first call `useUpdateAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAuthorMutation, { data, loading, error }] = useUpdateAuthorMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateAuthorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAuthorMutation, UpdateAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAuthorMutation, UpdateAuthorMutationVariables>(UpdateAuthorDocument, options);
      }
export type UpdateAuthorMutationHookResult = ReturnType<typeof useUpdateAuthorMutation>;
export type UpdateAuthorMutationResult = Apollo.MutationResult<UpdateAuthorMutation>;
export type UpdateAuthorMutationOptions = Apollo.BaseMutationOptions<UpdateAuthorMutation, UpdateAuthorMutationVariables>;
export const AddBookDocument = gql`
    mutation addBook($book: books_insert_input!) {
  insert_books_one(object: $book) {
    id
  }
}
    `;
export type AddBookMutationFn = Apollo.MutationFunction<AddBookMutation, AddBookMutationVariables>;

/**
 * __useAddBookMutation__
 *
 * To run a mutation, you first call `useAddBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookMutation, { data, loading, error }] = useAddBookMutation({
 *   variables: {
 *      book: // value for 'book'
 *   },
 * });
 */
export function useAddBookMutation(baseOptions?: Apollo.MutationHookOptions<AddBookMutation, AddBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument, options);
      }
export type AddBookMutationHookResult = ReturnType<typeof useAddBookMutation>;
export type AddBookMutationResult = Apollo.MutationResult<AddBookMutation>;
export type AddBookMutationOptions = Apollo.BaseMutationOptions<AddBookMutation, AddBookMutationVariables>;
export const DeleteBookDocument = gql`
    mutation deleteBook($id: uuid!) {
  delete_books_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteBookMutationFn = Apollo.MutationFunction<DeleteBookMutation, DeleteBookMutationVariables>;

/**
 * __useDeleteBookMutation__
 *
 * To run a mutation, you first call `useDeleteBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookMutation, { data, loading, error }] = useDeleteBookMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBookMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookMutation, DeleteBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, options);
      }
export type DeleteBookMutationHookResult = ReturnType<typeof useDeleteBookMutation>;
export type DeleteBookMutationResult = Apollo.MutationResult<DeleteBookMutation>;
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<DeleteBookMutation, DeleteBookMutationVariables>;
export const UpdateBookDocument = gql`
    mutation updateBook($id: uuid!, $title: String!) {
  update_books_by_pk(pk_columns: {id: $id}, _set: {title: $title}) {
    id
  }
}
    `;
export type UpdateBookMutationFn = Apollo.MutationFunction<UpdateBookMutation, UpdateBookMutationVariables>;

/**
 * __useUpdateBookMutation__
 *
 * To run a mutation, you first call `useUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookMutation, { data, loading, error }] = useUpdateBookMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateBookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument, options);
      }
export type UpdateBookMutationHookResult = ReturnType<typeof useUpdateBookMutation>;
export type UpdateBookMutationResult = Apollo.MutationResult<UpdateBookMutation>;
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<UpdateBookMutation, UpdateBookMutationVariables>;
export const GetAuthorsDocument = gql`
    query getAuthors {
  authors(limit: 5, order_by: {name: asc}) {
    __typename
    id
    name
    updated_at
    books {
      __typename
      id
      title
      isbn
      updated_at
    }
  }
}
    `;

/**
 * __useGetAuthorsQuery__
 *
 * To run a query within a React component, call `useGetAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthorsQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, options);
      }
export function useGetAuthorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, options);
        }
export type GetAuthorsQueryHookResult = ReturnType<typeof useGetAuthorsQuery>;
export type GetAuthorsLazyQueryHookResult = ReturnType<typeof useGetAuthorsLazyQuery>;
export type GetAuthorsQueryResult = Apollo.QueryResult<GetAuthorsQuery, GetAuthorsQueryVariables>;
export const AuthorsDocument = gql`
    subscription authors {
  authors(limit: 5, order_by: {name: asc}) {
    __typename
    id
    name
    updated_at
    books(order_by: {title: asc}) {
      __typename
      id
      title
      isbn
      updated_at
    }
  }
}
    `;

/**
 * __useAuthorsSubscription__
 *
 * To run a query within a React component, call `useAuthorsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAuthorsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAuthorsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<AuthorsSubscription, AuthorsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AuthorsSubscription, AuthorsSubscriptionVariables>(AuthorsDocument, options);
      }
export type AuthorsSubscriptionHookResult = ReturnType<typeof useAuthorsSubscription>;
export type AuthorsSubscriptionResult = Apollo.SubscriptionResult<AuthorsSubscription>;
export const AuthorsLiveDocument = gql`
    subscription authorsLive($lastUpdated: timestamptz!) {
  live {
    __typename
    id
    query {
      authors(limit: 5, order_by: {name: asc}) {
        __typename
        id
        name
        updated_at
        books(order_by: {title: asc}) {
          __typename
          id
          title
          isbn
          updated_at
        }
      }
    }
    delta(lastUpdated: $lastUpdated) {
      lastUpdated
      patch
      hash
    }
  }
}
    `;

/**
 * __useAuthorsLiveSubscription__
 *
 * To run a query within a React component, call `useAuthorsLiveSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAuthorsLiveSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorsLiveSubscription({
 *   variables: {
 *      lastUpdated: // value for 'lastUpdated'
 *   },
 * });
 */
export function useAuthorsLiveSubscription(baseOptions: Apollo.SubscriptionHookOptions<AuthorsLiveSubscription, AuthorsLiveSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AuthorsLiveSubscription, AuthorsLiveSubscriptionVariables>(AuthorsLiveDocument, options);
      }
export type AuthorsLiveSubscriptionHookResult = ReturnType<typeof useAuthorsLiveSubscription>;
export type AuthorsLiveSubscriptionResult = Apollo.SubscriptionResult<AuthorsLiveSubscription>;
export type LiveSubscriptionKeySpecifier = ('delta' | 'id' | 'query' | LiveSubscriptionKeySpecifier)[];
export type LiveSubscriptionFieldPolicy = {
	delta?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	query?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('delete_authors' | 'delete_authors_by_pk' | 'delete_books' | 'delete_books_by_pk' | 'delete_cache' | 'delete_cache_by_pk' | 'delete_events' | 'insert_authors' | 'insert_authors_one' | 'insert_books' | 'insert_books_one' | 'insert_cache' | 'insert_cache_one' | 'insert_events' | 'insert_events_one' | 'update_authors' | 'update_authors_by_pk' | 'update_books' | 'update_books_by_pk' | 'update_cache' | 'update_cache_by_pk' | 'update_events' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	delete_authors?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_authors_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_books?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_books_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_cache?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_cache_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_events?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_authors?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_authors_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_books?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_books_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_cache?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_cache_one?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_events?: FieldPolicy<any> | FieldReadFunction<any>,
	insert_events_one?: FieldPolicy<any> | FieldReadFunction<any>,
	update_authors?: FieldPolicy<any> | FieldReadFunction<any>,
	update_authors_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	update_books?: FieldPolicy<any> | FieldReadFunction<any>,
	update_books_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	update_cache?: FieldPolicy<any> | FieldReadFunction<any>,
	update_cache_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	update_events?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('authors' | 'authors_aggregate' | 'authors_by_pk' | 'books' | 'books_aggregate' | 'books_by_pk' | 'cache' | 'cache_aggregate' | 'cache_by_pk' | 'events' | 'events_aggregate' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	authors_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	authors_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	books?: FieldPolicy<any> | FieldReadFunction<any>,
	books_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	books_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	cache?: FieldPolicy<any> | FieldReadFunction<any>,
	cache_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	cache_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	events_aggregate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('authors' | 'authors_aggregate' | 'authors_by_pk' | 'books' | 'books_aggregate' | 'books_by_pk' | 'cache' | 'cache_aggregate' | 'cache_by_pk' | 'events' | 'events_aggregate' | 'live' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	authors_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	authors_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	books?: FieldPolicy<any> | FieldReadFunction<any>,
	books_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	books_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	cache?: FieldPolicy<any> | FieldReadFunction<any>,
	cache_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	cache_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	events_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	live?: FieldPolicy<any> | FieldReadFunction<any>
};
export type authorsKeySpecifier = ('books' | 'books_aggregate' | 'created_at' | 'id' | 'name' | 'updated_at' | authorsKeySpecifier)[];
export type authorsFieldPolicy = {
	books?: FieldPolicy<any> | FieldReadFunction<any>,
	books_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type authors_aggregateKeySpecifier = ('aggregate' | 'nodes' | authors_aggregateKeySpecifier)[];
export type authors_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type authors_aggregate_fieldsKeySpecifier = ('count' | 'max' | 'min' | authors_aggregate_fieldsKeySpecifier)[];
export type authors_aggregate_fieldsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
};
export type authors_max_fieldsKeySpecifier = ('created_at' | 'id' | 'name' | 'updated_at' | authors_max_fieldsKeySpecifier)[];
export type authors_max_fieldsFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type authors_min_fieldsKeySpecifier = ('created_at' | 'id' | 'name' | 'updated_at' | authors_min_fieldsKeySpecifier)[];
export type authors_min_fieldsFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type authors_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | authors_mutation_responseKeySpecifier)[];
export type authors_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type booksKeySpecifier = ('author' | 'author_id' | 'created_at' | 'id' | 'isbn' | 'published_at' | 'title' | 'updated_at' | booksKeySpecifier)[];
export type booksFieldPolicy = {
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	author_id?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isbn?: FieldPolicy<any> | FieldReadFunction<any>,
	published_at?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type books_aggregateKeySpecifier = ('aggregate' | 'nodes' | books_aggregateKeySpecifier)[];
export type books_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type books_aggregate_fieldsKeySpecifier = ('count' | 'max' | 'min' | books_aggregate_fieldsKeySpecifier)[];
export type books_aggregate_fieldsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
};
export type books_max_fieldsKeySpecifier = ('author_id' | 'created_at' | 'id' | 'isbn' | 'published_at' | 'title' | 'updated_at' | books_max_fieldsKeySpecifier)[];
export type books_max_fieldsFieldPolicy = {
	author_id?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isbn?: FieldPolicy<any> | FieldReadFunction<any>,
	published_at?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type books_min_fieldsKeySpecifier = ('author_id' | 'created_at' | 'id' | 'isbn' | 'published_at' | 'title' | 'updated_at' | books_min_fieldsKeySpecifier)[];
export type books_min_fieldsFieldPolicy = {
	author_id?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isbn?: FieldPolicy<any> | FieldReadFunction<any>,
	published_at?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type books_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | books_mutation_responseKeySpecifier)[];
export type books_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type cacheKeySpecifier = ('created_at' | 'id' | 'lastUpdated' | 'patch' | 'query' | 'result' | 'updated_at' | cacheKeySpecifier)[];
export type cacheFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>,
	patch?: FieldPolicy<any> | FieldReadFunction<any>,
	query?: FieldPolicy<any> | FieldReadFunction<any>,
	result?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type cache_aggregateKeySpecifier = ('aggregate' | 'nodes' | cache_aggregateKeySpecifier)[];
export type cache_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type cache_aggregate_fieldsKeySpecifier = ('count' | 'max' | 'min' | cache_aggregate_fieldsKeySpecifier)[];
export type cache_aggregate_fieldsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
};
export type cache_max_fieldsKeySpecifier = ('created_at' | 'id' | 'lastUpdated' | 'query' | 'updated_at' | cache_max_fieldsKeySpecifier)[];
export type cache_max_fieldsFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>,
	query?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type cache_min_fieldsKeySpecifier = ('created_at' | 'id' | 'lastUpdated' | 'query' | 'updated_at' | cache_min_fieldsKeySpecifier)[];
export type cache_min_fieldsFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>,
	query?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type cache_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | cache_mutation_responseKeySpecifier)[];
export type cache_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type deltaKeySpecifier = ('hash' | 'lastUpdated' | 'patch' | deltaKeySpecifier)[];
export type deltaFieldPolicy = {
	hash?: FieldPolicy<any> | FieldReadFunction<any>,
	lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>,
	patch?: FieldPolicy<any> | FieldReadFunction<any>
};
export type eventsKeySpecifier = ('connection_id' | 'event_data' | 'event_number' | 'event_time' | 'is_error' | 'label' | 'latency' | 'operation_id' | eventsKeySpecifier)[];
export type eventsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_data?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	event_time?: FieldPolicy<any> | FieldReadFunction<any>,
	is_error?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_aggregateKeySpecifier = ('aggregate' | 'nodes' | events_aggregateKeySpecifier)[];
export type events_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_aggregate_fieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddev_pop' | 'stddev_samp' | 'sum' | 'var_pop' | 'var_samp' | 'variance' | events_aggregate_fieldsKeySpecifier)[];
export type events_aggregate_fieldsFieldPolicy = {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev_pop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev_samp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	var_pop?: FieldPolicy<any> | FieldReadFunction<any>,
	var_samp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_avg_fieldsKeySpecifier = ('connection_id' | 'event_number' | 'latency' | 'operation_id' | events_avg_fieldsKeySpecifier)[];
export type events_avg_fieldsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_max_fieldsKeySpecifier = ('connection_id' | 'event_number' | 'event_time' | 'label' | 'latency' | 'operation_id' | events_max_fieldsKeySpecifier)[];
export type events_max_fieldsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	event_time?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_min_fieldsKeySpecifier = ('connection_id' | 'event_number' | 'event_time' | 'label' | 'latency' | 'operation_id' | events_min_fieldsKeySpecifier)[];
export type events_min_fieldsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	event_time?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_mutation_responseKeySpecifier = ('affected_rows' | 'returning' | events_mutation_responseKeySpecifier)[];
export type events_mutation_responseFieldPolicy = {
	affected_rows?: FieldPolicy<any> | FieldReadFunction<any>,
	returning?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_stddev_fieldsKeySpecifier = ('connection_id' | 'event_number' | 'latency' | 'operation_id' | events_stddev_fieldsKeySpecifier)[];
export type events_stddev_fieldsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_stddev_pop_fieldsKeySpecifier = ('connection_id' | 'event_number' | 'latency' | 'operation_id' | events_stddev_pop_fieldsKeySpecifier)[];
export type events_stddev_pop_fieldsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_stddev_samp_fieldsKeySpecifier = ('connection_id' | 'event_number' | 'latency' | 'operation_id' | events_stddev_samp_fieldsKeySpecifier)[];
export type events_stddev_samp_fieldsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_sum_fieldsKeySpecifier = ('connection_id' | 'event_number' | 'latency' | 'operation_id' | events_sum_fieldsKeySpecifier)[];
export type events_sum_fieldsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_var_pop_fieldsKeySpecifier = ('connection_id' | 'event_number' | 'latency' | 'operation_id' | events_var_pop_fieldsKeySpecifier)[];
export type events_var_pop_fieldsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_var_samp_fieldsKeySpecifier = ('connection_id' | 'event_number' | 'latency' | 'operation_id' | events_var_samp_fieldsKeySpecifier)[];
export type events_var_samp_fieldsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type events_variance_fieldsKeySpecifier = ('connection_id' | 'event_number' | 'latency' | 'operation_id' | events_variance_fieldsKeySpecifier)[];
export type events_variance_fieldsFieldPolicy = {
	connection_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event_number?: FieldPolicy<any> | FieldReadFunction<any>,
	latency?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type subscription_rootKeySpecifier = ('authors' | 'authors_aggregate' | 'authors_by_pk' | 'books' | 'books_aggregate' | 'books_by_pk' | 'cache' | 'cache_aggregate' | 'cache_by_pk' | 'events' | 'events_aggregate' | subscription_rootKeySpecifier)[];
export type subscription_rootFieldPolicy = {
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	authors_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	authors_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	books?: FieldPolicy<any> | FieldReadFunction<any>,
	books_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	books_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	cache?: FieldPolicy<any> | FieldReadFunction<any>,
	cache_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	cache_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	events_aggregate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	LiveSubscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LiveSubscriptionKeySpecifier | (() => undefined | LiveSubscriptionKeySpecifier),
		fields?: LiveSubscriptionFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	authors?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | authorsKeySpecifier | (() => undefined | authorsKeySpecifier),
		fields?: authorsFieldPolicy,
	},
	authors_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | authors_aggregateKeySpecifier | (() => undefined | authors_aggregateKeySpecifier),
		fields?: authors_aggregateFieldPolicy,
	},
	authors_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | authors_aggregate_fieldsKeySpecifier | (() => undefined | authors_aggregate_fieldsKeySpecifier),
		fields?: authors_aggregate_fieldsFieldPolicy,
	},
	authors_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | authors_max_fieldsKeySpecifier | (() => undefined | authors_max_fieldsKeySpecifier),
		fields?: authors_max_fieldsFieldPolicy,
	},
	authors_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | authors_min_fieldsKeySpecifier | (() => undefined | authors_min_fieldsKeySpecifier),
		fields?: authors_min_fieldsFieldPolicy,
	},
	authors_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | authors_mutation_responseKeySpecifier | (() => undefined | authors_mutation_responseKeySpecifier),
		fields?: authors_mutation_responseFieldPolicy,
	},
	books?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | booksKeySpecifier | (() => undefined | booksKeySpecifier),
		fields?: booksFieldPolicy,
	},
	books_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | books_aggregateKeySpecifier | (() => undefined | books_aggregateKeySpecifier),
		fields?: books_aggregateFieldPolicy,
	},
	books_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | books_aggregate_fieldsKeySpecifier | (() => undefined | books_aggregate_fieldsKeySpecifier),
		fields?: books_aggregate_fieldsFieldPolicy,
	},
	books_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | books_max_fieldsKeySpecifier | (() => undefined | books_max_fieldsKeySpecifier),
		fields?: books_max_fieldsFieldPolicy,
	},
	books_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | books_min_fieldsKeySpecifier | (() => undefined | books_min_fieldsKeySpecifier),
		fields?: books_min_fieldsFieldPolicy,
	},
	books_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | books_mutation_responseKeySpecifier | (() => undefined | books_mutation_responseKeySpecifier),
		fields?: books_mutation_responseFieldPolicy,
	},
	cache?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | cacheKeySpecifier | (() => undefined | cacheKeySpecifier),
		fields?: cacheFieldPolicy,
	},
	cache_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | cache_aggregateKeySpecifier | (() => undefined | cache_aggregateKeySpecifier),
		fields?: cache_aggregateFieldPolicy,
	},
	cache_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | cache_aggregate_fieldsKeySpecifier | (() => undefined | cache_aggregate_fieldsKeySpecifier),
		fields?: cache_aggregate_fieldsFieldPolicy,
	},
	cache_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | cache_max_fieldsKeySpecifier | (() => undefined | cache_max_fieldsKeySpecifier),
		fields?: cache_max_fieldsFieldPolicy,
	},
	cache_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | cache_min_fieldsKeySpecifier | (() => undefined | cache_min_fieldsKeySpecifier),
		fields?: cache_min_fieldsFieldPolicy,
	},
	cache_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | cache_mutation_responseKeySpecifier | (() => undefined | cache_mutation_responseKeySpecifier),
		fields?: cache_mutation_responseFieldPolicy,
	},
	delta?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | deltaKeySpecifier | (() => undefined | deltaKeySpecifier),
		fields?: deltaFieldPolicy,
	},
	events?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | eventsKeySpecifier | (() => undefined | eventsKeySpecifier),
		fields?: eventsFieldPolicy,
	},
	events_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_aggregateKeySpecifier | (() => undefined | events_aggregateKeySpecifier),
		fields?: events_aggregateFieldPolicy,
	},
	events_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_aggregate_fieldsKeySpecifier | (() => undefined | events_aggregate_fieldsKeySpecifier),
		fields?: events_aggregate_fieldsFieldPolicy,
	},
	events_avg_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_avg_fieldsKeySpecifier | (() => undefined | events_avg_fieldsKeySpecifier),
		fields?: events_avg_fieldsFieldPolicy,
	},
	events_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_max_fieldsKeySpecifier | (() => undefined | events_max_fieldsKeySpecifier),
		fields?: events_max_fieldsFieldPolicy,
	},
	events_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_min_fieldsKeySpecifier | (() => undefined | events_min_fieldsKeySpecifier),
		fields?: events_min_fieldsFieldPolicy,
	},
	events_mutation_response?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_mutation_responseKeySpecifier | (() => undefined | events_mutation_responseKeySpecifier),
		fields?: events_mutation_responseFieldPolicy,
	},
	events_stddev_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_stddev_fieldsKeySpecifier | (() => undefined | events_stddev_fieldsKeySpecifier),
		fields?: events_stddev_fieldsFieldPolicy,
	},
	events_stddev_pop_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_stddev_pop_fieldsKeySpecifier | (() => undefined | events_stddev_pop_fieldsKeySpecifier),
		fields?: events_stddev_pop_fieldsFieldPolicy,
	},
	events_stddev_samp_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_stddev_samp_fieldsKeySpecifier | (() => undefined | events_stddev_samp_fieldsKeySpecifier),
		fields?: events_stddev_samp_fieldsFieldPolicy,
	},
	events_sum_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_sum_fieldsKeySpecifier | (() => undefined | events_sum_fieldsKeySpecifier),
		fields?: events_sum_fieldsFieldPolicy,
	},
	events_var_pop_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_var_pop_fieldsKeySpecifier | (() => undefined | events_var_pop_fieldsKeySpecifier),
		fields?: events_var_pop_fieldsFieldPolicy,
	},
	events_var_samp_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_var_samp_fieldsKeySpecifier | (() => undefined | events_var_samp_fieldsKeySpecifier),
		fields?: events_var_samp_fieldsFieldPolicy,
	},
	events_variance_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | events_variance_fieldsKeySpecifier | (() => undefined | events_variance_fieldsKeySpecifier),
		fields?: events_variance_fieldsFieldPolicy,
	},
	subscription_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | subscription_rootKeySpecifier | (() => undefined | subscription_rootKeySpecifier),
		fields?: subscription_rootFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;