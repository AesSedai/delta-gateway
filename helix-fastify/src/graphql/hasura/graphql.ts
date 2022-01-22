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
  timestamp: any;
  timestamptz: any;
  uuid: string;
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
  /** An array relationship */
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
  /** An array relationship */
  library_books: Array<Library_Books>;
  /** An aggregate relationship */
  library_books_aggregate: Library_Books_Aggregate;
  published_at?: Maybe<Scalars['timestamp']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "books" */
export type BooksLibrary_BooksArgs = {
  distinct_on?: InputMaybe<Array<Library_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Books_Order_By>>;
  where?: InputMaybe<Library_Books_Bool_Exp>;
};


/** columns and relationships of "books" */
export type BooksLibrary_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Library_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Books_Order_By>>;
  where?: InputMaybe<Library_Books_Bool_Exp>;
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
  library_books?: InputMaybe<Library_Books_Bool_Exp>;
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
  library_books?: InputMaybe<Library_Books_Arr_Rel_Insert_Input>;
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

/** input type for inserting object relation for remote table "books" */
export type Books_Obj_Rel_Insert_Input = {
  data: Books_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Books_On_Conflict>;
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
  library_books_aggregate?: InputMaybe<Library_Books_Aggregate_Order_By>;
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

/** columns and relationships of "libraries" */
export type Libraries = {
  __typename: 'libraries';
  address?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An array relationship */
  library_books: Array<Library_Books>;
  /** An aggregate relationship */
  library_books_aggregate: Library_Books_Aggregate;
  /** fetch data from the table: "library_members" */
  library_members: Array<Library_Members>;
  /** An aggregate relationship */
  library_members_aggregate: Library_Members_Aggregate;
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "libraries" */
export type LibrariesLibrary_BooksArgs = {
  distinct_on?: InputMaybe<Array<Library_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Books_Order_By>>;
  where?: InputMaybe<Library_Books_Bool_Exp>;
};


/** columns and relationships of "libraries" */
export type LibrariesLibrary_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Library_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Books_Order_By>>;
  where?: InputMaybe<Library_Books_Bool_Exp>;
};


/** columns and relationships of "libraries" */
export type LibrariesLibrary_MembersArgs = {
  distinct_on?: InputMaybe<Array<Library_Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Members_Order_By>>;
  where?: InputMaybe<Library_Members_Bool_Exp>;
};


/** columns and relationships of "libraries" */
export type LibrariesLibrary_Members_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Library_Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Members_Order_By>>;
  where?: InputMaybe<Library_Members_Bool_Exp>;
};

/** aggregated selection of "libraries" */
export type Libraries_Aggregate = {
  __typename: 'libraries_aggregate';
  aggregate?: Maybe<Libraries_Aggregate_Fields>;
  nodes: Array<Libraries>;
};

/** aggregate fields of "libraries" */
export type Libraries_Aggregate_Fields = {
  __typename: 'libraries_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Libraries_Max_Fields>;
  min?: Maybe<Libraries_Min_Fields>;
};


/** aggregate fields of "libraries" */
export type Libraries_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Libraries_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "libraries". All fields are combined with a logical 'AND'. */
export type Libraries_Bool_Exp = {
  _and?: InputMaybe<Array<Libraries_Bool_Exp>>;
  _not?: InputMaybe<Libraries_Bool_Exp>;
  _or?: InputMaybe<Array<Libraries_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  library_books?: InputMaybe<Library_Books_Bool_Exp>;
  library_members?: InputMaybe<Library_Members_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "libraries" */
export enum Libraries_Constraint {
  /** unique or primary key constraint */
  LibrariesPkey = 'libraries_pkey'
}

/** input type for inserting data into table "libraries" */
export type Libraries_Insert_Input = {
  address?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  library_books?: InputMaybe<Library_Books_Arr_Rel_Insert_Input>;
  library_members?: InputMaybe<Library_Members_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Libraries_Max_Fields = {
  __typename: 'libraries_max_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Libraries_Min_Fields = {
  __typename: 'libraries_min_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "libraries" */
export type Libraries_Mutation_Response = {
  __typename: 'libraries_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Libraries>;
};

/** input type for inserting object relation for remote table "libraries" */
export type Libraries_Obj_Rel_Insert_Input = {
  data: Libraries_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Libraries_On_Conflict>;
};

/** on conflict condition type for table "libraries" */
export type Libraries_On_Conflict = {
  constraint: Libraries_Constraint;
  update_columns?: Array<Libraries_Update_Column>;
  where?: InputMaybe<Libraries_Bool_Exp>;
};

/** Ordering options when selecting data from "libraries". */
export type Libraries_Order_By = {
  address?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library_books_aggregate?: InputMaybe<Library_Books_Aggregate_Order_By>;
  library_members_aggregate?: InputMaybe<Library_Members_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: libraries */
export type Libraries_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "libraries" */
export enum Libraries_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "libraries" */
export type Libraries_Set_Input = {
  address?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "libraries" */
export enum Libraries_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "library_books" */
export type Library_Books = {
  __typename: 'library_books';
  /** An object relationship */
  book: Books;
  book_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  library: Libraries;
  library_id: Scalars['uuid'];
  /** An array relationship */
  loans: Array<Loans>;
  /** An aggregate relationship */
  loans_aggregate: Loans_Aggregate;
  quantity: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "library_books" */
export type Library_BooksLoansArgs = {
  distinct_on?: InputMaybe<Array<Loans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Loans_Order_By>>;
  where?: InputMaybe<Loans_Bool_Exp>;
};


/** columns and relationships of "library_books" */
export type Library_BooksLoans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Loans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Loans_Order_By>>;
  where?: InputMaybe<Loans_Bool_Exp>;
};

/** aggregated selection of "library_books" */
export type Library_Books_Aggregate = {
  __typename: 'library_books_aggregate';
  aggregate?: Maybe<Library_Books_Aggregate_Fields>;
  nodes: Array<Library_Books>;
};

/** aggregate fields of "library_books" */
export type Library_Books_Aggregate_Fields = {
  __typename: 'library_books_aggregate_fields';
  avg?: Maybe<Library_Books_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Library_Books_Max_Fields>;
  min?: Maybe<Library_Books_Min_Fields>;
  stddev?: Maybe<Library_Books_Stddev_Fields>;
  stddev_pop?: Maybe<Library_Books_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Library_Books_Stddev_Samp_Fields>;
  sum?: Maybe<Library_Books_Sum_Fields>;
  var_pop?: Maybe<Library_Books_Var_Pop_Fields>;
  var_samp?: Maybe<Library_Books_Var_Samp_Fields>;
  variance?: Maybe<Library_Books_Variance_Fields>;
};


/** aggregate fields of "library_books" */
export type Library_Books_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Library_Books_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "library_books" */
export type Library_Books_Aggregate_Order_By = {
  avg?: InputMaybe<Library_Books_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Library_Books_Max_Order_By>;
  min?: InputMaybe<Library_Books_Min_Order_By>;
  stddev?: InputMaybe<Library_Books_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Library_Books_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Library_Books_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Library_Books_Sum_Order_By>;
  var_pop?: InputMaybe<Library_Books_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Library_Books_Var_Samp_Order_By>;
  variance?: InputMaybe<Library_Books_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "library_books" */
export type Library_Books_Arr_Rel_Insert_Input = {
  data: Array<Library_Books_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Library_Books_On_Conflict>;
};

/** aggregate avg on columns */
export type Library_Books_Avg_Fields = {
  __typename: 'library_books_avg_fields';
  quantity?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "library_books" */
export type Library_Books_Avg_Order_By = {
  quantity?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "library_books". All fields are combined with a logical 'AND'. */
export type Library_Books_Bool_Exp = {
  _and?: InputMaybe<Array<Library_Books_Bool_Exp>>;
  _not?: InputMaybe<Library_Books_Bool_Exp>;
  _or?: InputMaybe<Array<Library_Books_Bool_Exp>>;
  book?: InputMaybe<Books_Bool_Exp>;
  book_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  library?: InputMaybe<Libraries_Bool_Exp>;
  library_id?: InputMaybe<Uuid_Comparison_Exp>;
  loans?: InputMaybe<Loans_Bool_Exp>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "library_books" */
export enum Library_Books_Constraint {
  /** unique or primary key constraint */
  LibraryBooksPkey = 'library_books_pkey'
}

/** input type for incrementing numeric columns in table "library_books" */
export type Library_Books_Inc_Input = {
  quantity?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "library_books" */
export type Library_Books_Insert_Input = {
  book?: InputMaybe<Books_Obj_Rel_Insert_Input>;
  book_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  library?: InputMaybe<Libraries_Obj_Rel_Insert_Input>;
  library_id?: InputMaybe<Scalars['uuid']>;
  loans?: InputMaybe<Loans_Arr_Rel_Insert_Input>;
  quantity?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Library_Books_Max_Fields = {
  __typename: 'library_books_max_fields';
  book_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  library_id?: Maybe<Scalars['uuid']>;
  quantity?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "library_books" */
export type Library_Books_Max_Order_By = {
  book_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Library_Books_Min_Fields = {
  __typename: 'library_books_min_fields';
  book_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  library_id?: Maybe<Scalars['uuid']>;
  quantity?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "library_books" */
export type Library_Books_Min_Order_By = {
  book_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "library_books" */
export type Library_Books_Mutation_Response = {
  __typename: 'library_books_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Library_Books>;
};

/** input type for inserting object relation for remote table "library_books" */
export type Library_Books_Obj_Rel_Insert_Input = {
  data: Library_Books_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Library_Books_On_Conflict>;
};

/** on conflict condition type for table "library_books" */
export type Library_Books_On_Conflict = {
  constraint: Library_Books_Constraint;
  update_columns?: Array<Library_Books_Update_Column>;
  where?: InputMaybe<Library_Books_Bool_Exp>;
};

/** Ordering options when selecting data from "library_books". */
export type Library_Books_Order_By = {
  book?: InputMaybe<Books_Order_By>;
  book_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library?: InputMaybe<Libraries_Order_By>;
  library_id?: InputMaybe<Order_By>;
  loans_aggregate?: InputMaybe<Loans_Aggregate_Order_By>;
  quantity?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: library_books */
export type Library_Books_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "library_books" */
export enum Library_Books_Select_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'library_id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "library_books" */
export type Library_Books_Set_Input = {
  book_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  library_id?: InputMaybe<Scalars['uuid']>;
  quantity?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Library_Books_Stddev_Fields = {
  __typename: 'library_books_stddev_fields';
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "library_books" */
export type Library_Books_Stddev_Order_By = {
  quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Library_Books_Stddev_Pop_Fields = {
  __typename: 'library_books_stddev_pop_fields';
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "library_books" */
export type Library_Books_Stddev_Pop_Order_By = {
  quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Library_Books_Stddev_Samp_Fields = {
  __typename: 'library_books_stddev_samp_fields';
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "library_books" */
export type Library_Books_Stddev_Samp_Order_By = {
  quantity?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Library_Books_Sum_Fields = {
  __typename: 'library_books_sum_fields';
  quantity?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "library_books" */
export type Library_Books_Sum_Order_By = {
  quantity?: InputMaybe<Order_By>;
};

/** update columns of table "library_books" */
export enum Library_Books_Update_Column {
  /** column name */
  BookId = 'book_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'library_id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Library_Books_Var_Pop_Fields = {
  __typename: 'library_books_var_pop_fields';
  quantity?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "library_books" */
export type Library_Books_Var_Pop_Order_By = {
  quantity?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Library_Books_Var_Samp_Fields = {
  __typename: 'library_books_var_samp_fields';
  quantity?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "library_books" */
export type Library_Books_Var_Samp_Order_By = {
  quantity?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Library_Books_Variance_Fields = {
  __typename: 'library_books_variance_fields';
  quantity?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "library_books" */
export type Library_Books_Variance_Order_By = {
  quantity?: InputMaybe<Order_By>;
};

/** columns and relationships of "library_members" */
export type Library_Members = {
  __typename: 'library_members';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  library: Libraries;
  library_id: Scalars['uuid'];
  /** An object relationship */
  member: Members;
  member_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "library_members" */
export type Library_Members_Aggregate = {
  __typename: 'library_members_aggregate';
  aggregate?: Maybe<Library_Members_Aggregate_Fields>;
  nodes: Array<Library_Members>;
};

/** aggregate fields of "library_members" */
export type Library_Members_Aggregate_Fields = {
  __typename: 'library_members_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Library_Members_Max_Fields>;
  min?: Maybe<Library_Members_Min_Fields>;
};


/** aggregate fields of "library_members" */
export type Library_Members_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Library_Members_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "library_members" */
export type Library_Members_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Library_Members_Max_Order_By>;
  min?: InputMaybe<Library_Members_Min_Order_By>;
};

/** input type for inserting array relation for remote table "library_members" */
export type Library_Members_Arr_Rel_Insert_Input = {
  data: Array<Library_Members_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Library_Members_On_Conflict>;
};

/** Boolean expression to filter rows from the table "library_members". All fields are combined with a logical 'AND'. */
export type Library_Members_Bool_Exp = {
  _and?: InputMaybe<Array<Library_Members_Bool_Exp>>;
  _not?: InputMaybe<Library_Members_Bool_Exp>;
  _or?: InputMaybe<Array<Library_Members_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  library?: InputMaybe<Libraries_Bool_Exp>;
  library_id?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Members_Bool_Exp>;
  member_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "library_members" */
export enum Library_Members_Constraint {
  /** unique or primary key constraint */
  LibraryMembersPkey = 'library_members_pkey'
}

/** input type for inserting data into table "library_members" */
export type Library_Members_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  library?: InputMaybe<Libraries_Obj_Rel_Insert_Input>;
  library_id?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Members_Obj_Rel_Insert_Input>;
  member_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Library_Members_Max_Fields = {
  __typename: 'library_members_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  library_id?: Maybe<Scalars['uuid']>;
  member_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "library_members" */
export type Library_Members_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library_id?: InputMaybe<Order_By>;
  member_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Library_Members_Min_Fields = {
  __typename: 'library_members_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  library_id?: Maybe<Scalars['uuid']>;
  member_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "library_members" */
export type Library_Members_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library_id?: InputMaybe<Order_By>;
  member_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "library_members" */
export type Library_Members_Mutation_Response = {
  __typename: 'library_members_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Library_Members>;
};

/** on conflict condition type for table "library_members" */
export type Library_Members_On_Conflict = {
  constraint: Library_Members_Constraint;
  update_columns?: Array<Library_Members_Update_Column>;
  where?: InputMaybe<Library_Members_Bool_Exp>;
};

/** Ordering options when selecting data from "library_members". */
export type Library_Members_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library?: InputMaybe<Libraries_Order_By>;
  library_id?: InputMaybe<Order_By>;
  member?: InputMaybe<Members_Order_By>;
  member_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: library_members */
export type Library_Members_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "library_members" */
export enum Library_Members_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'library_id',
  /** column name */
  MemberId = 'member_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "library_members" */
export type Library_Members_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  library_id?: InputMaybe<Scalars['uuid']>;
  member_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "library_members" */
export enum Library_Members_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'library_id',
  /** column name */
  MemberId = 'member_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "loans" */
export type Loans = {
  __typename: 'loans';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  library_book: Library_Books;
  library_book_id: Scalars['uuid'];
  /** An object relationship */
  member: Members;
  member_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "loans" */
export type Loans_Aggregate = {
  __typename: 'loans_aggregate';
  aggregate?: Maybe<Loans_Aggregate_Fields>;
  nodes: Array<Loans>;
};

/** aggregate fields of "loans" */
export type Loans_Aggregate_Fields = {
  __typename: 'loans_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Loans_Max_Fields>;
  min?: Maybe<Loans_Min_Fields>;
};


/** aggregate fields of "loans" */
export type Loans_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Loans_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "loans" */
export type Loans_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Loans_Max_Order_By>;
  min?: InputMaybe<Loans_Min_Order_By>;
};

/** input type for inserting array relation for remote table "loans" */
export type Loans_Arr_Rel_Insert_Input = {
  data: Array<Loans_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Loans_On_Conflict>;
};

/** Boolean expression to filter rows from the table "loans". All fields are combined with a logical 'AND'. */
export type Loans_Bool_Exp = {
  _and?: InputMaybe<Array<Loans_Bool_Exp>>;
  _not?: InputMaybe<Loans_Bool_Exp>;
  _or?: InputMaybe<Array<Loans_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  library_book?: InputMaybe<Library_Books_Bool_Exp>;
  library_book_id?: InputMaybe<Uuid_Comparison_Exp>;
  member?: InputMaybe<Members_Bool_Exp>;
  member_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "loans" */
export enum Loans_Constraint {
  /** unique or primary key constraint */
  LoansLibraryBookIdMemberIdUnique = 'loans_library_book_id_member_id_unique',
  /** unique or primary key constraint */
  LoansPkey = 'loans_pkey'
}

/** input type for inserting data into table "loans" */
export type Loans_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  library_book?: InputMaybe<Library_Books_Obj_Rel_Insert_Input>;
  library_book_id?: InputMaybe<Scalars['uuid']>;
  member?: InputMaybe<Members_Obj_Rel_Insert_Input>;
  member_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Loans_Max_Fields = {
  __typename: 'loans_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  library_book_id?: Maybe<Scalars['uuid']>;
  member_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "loans" */
export type Loans_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library_book_id?: InputMaybe<Order_By>;
  member_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Loans_Min_Fields = {
  __typename: 'loans_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  library_book_id?: Maybe<Scalars['uuid']>;
  member_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "loans" */
export type Loans_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library_book_id?: InputMaybe<Order_By>;
  member_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "loans" */
export type Loans_Mutation_Response = {
  __typename: 'loans_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Loans>;
};

/** on conflict condition type for table "loans" */
export type Loans_On_Conflict = {
  constraint: Loans_Constraint;
  update_columns?: Array<Loans_Update_Column>;
  where?: InputMaybe<Loans_Bool_Exp>;
};

/** Ordering options when selecting data from "loans". */
export type Loans_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library_book?: InputMaybe<Library_Books_Order_By>;
  library_book_id?: InputMaybe<Order_By>;
  member?: InputMaybe<Members_Order_By>;
  member_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: loans */
export type Loans_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "loans" */
export enum Loans_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryBookId = 'library_book_id',
  /** column name */
  MemberId = 'member_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "loans" */
export type Loans_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  library_book_id?: InputMaybe<Scalars['uuid']>;
  member_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "loans" */
export enum Loans_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryBookId = 'library_book_id',
  /** column name */
  MemberId = 'member_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "members" */
export type Members = {
  __typename: 'members';
  address?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** fetch data from the table: "library_members" */
  library_members: Array<Library_Members>;
  /** An aggregate relationship */
  library_members_aggregate: Library_Members_Aggregate;
  /** An array relationship */
  loans: Array<Loans>;
  /** An aggregate relationship */
  loans_aggregate: Loans_Aggregate;
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "members" */
export type MembersLibrary_MembersArgs = {
  distinct_on?: InputMaybe<Array<Library_Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Members_Order_By>>;
  where?: InputMaybe<Library_Members_Bool_Exp>;
};


/** columns and relationships of "members" */
export type MembersLibrary_Members_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Library_Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Members_Order_By>>;
  where?: InputMaybe<Library_Members_Bool_Exp>;
};


/** columns and relationships of "members" */
export type MembersLoansArgs = {
  distinct_on?: InputMaybe<Array<Loans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Loans_Order_By>>;
  where?: InputMaybe<Loans_Bool_Exp>;
};


/** columns and relationships of "members" */
export type MembersLoans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Loans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Loans_Order_By>>;
  where?: InputMaybe<Loans_Bool_Exp>;
};

/** aggregated selection of "members" */
export type Members_Aggregate = {
  __typename: 'members_aggregate';
  aggregate?: Maybe<Members_Aggregate_Fields>;
  nodes: Array<Members>;
};

/** aggregate fields of "members" */
export type Members_Aggregate_Fields = {
  __typename: 'members_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Members_Max_Fields>;
  min?: Maybe<Members_Min_Fields>;
};


/** aggregate fields of "members" */
export type Members_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Members_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "members". All fields are combined with a logical 'AND'. */
export type Members_Bool_Exp = {
  _and?: InputMaybe<Array<Members_Bool_Exp>>;
  _not?: InputMaybe<Members_Bool_Exp>;
  _or?: InputMaybe<Array<Members_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  library_members?: InputMaybe<Library_Members_Bool_Exp>;
  loans?: InputMaybe<Loans_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "members" */
export enum Members_Constraint {
  /** unique or primary key constraint */
  MembersPkey = 'members_pkey'
}

/** input type for inserting data into table "members" */
export type Members_Insert_Input = {
  address?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  library_members?: InputMaybe<Library_Members_Arr_Rel_Insert_Input>;
  loans?: InputMaybe<Loans_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Members_Max_Fields = {
  __typename: 'members_max_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Members_Min_Fields = {
  __typename: 'members_min_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "members" */
export type Members_Mutation_Response = {
  __typename: 'members_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Members>;
};

/** input type for inserting object relation for remote table "members" */
export type Members_Obj_Rel_Insert_Input = {
  data: Members_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Members_On_Conflict>;
};

/** on conflict condition type for table "members" */
export type Members_On_Conflict = {
  constraint: Members_Constraint;
  update_columns?: Array<Members_Update_Column>;
  where?: InputMaybe<Members_Bool_Exp>;
};

/** Ordering options when selecting data from "members". */
export type Members_Order_By = {
  address?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  library_members_aggregate?: InputMaybe<Library_Members_Aggregate_Order_By>;
  loans_aggregate?: InputMaybe<Loans_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: members */
export type Members_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "members" */
export enum Members_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "members" */
export type Members_Set_Input = {
  address?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "members" */
export enum Members_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

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
  /** delete data from the table: "libraries" */
  delete_libraries?: Maybe<Libraries_Mutation_Response>;
  /** delete single row from the table: "libraries" */
  delete_libraries_by_pk?: Maybe<Libraries>;
  /** delete data from the table: "library_books" */
  delete_library_books?: Maybe<Library_Books_Mutation_Response>;
  /** delete single row from the table: "library_books" */
  delete_library_books_by_pk?: Maybe<Library_Books>;
  /** delete data from the table: "library_members" */
  delete_library_members?: Maybe<Library_Members_Mutation_Response>;
  /** delete single row from the table: "library_members" */
  delete_library_members_by_pk?: Maybe<Library_Members>;
  /** delete data from the table: "loans" */
  delete_loans?: Maybe<Loans_Mutation_Response>;
  /** delete single row from the table: "loans" */
  delete_loans_by_pk?: Maybe<Loans>;
  /** delete data from the table: "members" */
  delete_members?: Maybe<Members_Mutation_Response>;
  /** delete single row from the table: "members" */
  delete_members_by_pk?: Maybe<Members>;
  /** insert data into the table: "authors" */
  insert_authors?: Maybe<Authors_Mutation_Response>;
  /** insert a single row into the table: "authors" */
  insert_authors_one?: Maybe<Authors>;
  /** insert data into the table: "books" */
  insert_books?: Maybe<Books_Mutation_Response>;
  /** insert a single row into the table: "books" */
  insert_books_one?: Maybe<Books>;
  /** insert data into the table: "libraries" */
  insert_libraries?: Maybe<Libraries_Mutation_Response>;
  /** insert a single row into the table: "libraries" */
  insert_libraries_one?: Maybe<Libraries>;
  /** insert data into the table: "library_books" */
  insert_library_books?: Maybe<Library_Books_Mutation_Response>;
  /** insert a single row into the table: "library_books" */
  insert_library_books_one?: Maybe<Library_Books>;
  /** insert data into the table: "library_members" */
  insert_library_members?: Maybe<Library_Members_Mutation_Response>;
  /** insert a single row into the table: "library_members" */
  insert_library_members_one?: Maybe<Library_Members>;
  /** insert data into the table: "loans" */
  insert_loans?: Maybe<Loans_Mutation_Response>;
  /** insert a single row into the table: "loans" */
  insert_loans_one?: Maybe<Loans>;
  /** insert data into the table: "members" */
  insert_members?: Maybe<Members_Mutation_Response>;
  /** insert a single row into the table: "members" */
  insert_members_one?: Maybe<Members>;
  /** update data of the table: "authors" */
  update_authors?: Maybe<Authors_Mutation_Response>;
  /** update single row of the table: "authors" */
  update_authors_by_pk?: Maybe<Authors>;
  /** update data of the table: "books" */
  update_books?: Maybe<Books_Mutation_Response>;
  /** update single row of the table: "books" */
  update_books_by_pk?: Maybe<Books>;
  /** update data of the table: "libraries" */
  update_libraries?: Maybe<Libraries_Mutation_Response>;
  /** update single row of the table: "libraries" */
  update_libraries_by_pk?: Maybe<Libraries>;
  /** update data of the table: "library_books" */
  update_library_books?: Maybe<Library_Books_Mutation_Response>;
  /** update single row of the table: "library_books" */
  update_library_books_by_pk?: Maybe<Library_Books>;
  /** update data of the table: "library_members" */
  update_library_members?: Maybe<Library_Members_Mutation_Response>;
  /** update single row of the table: "library_members" */
  update_library_members_by_pk?: Maybe<Library_Members>;
  /** update data of the table: "loans" */
  update_loans?: Maybe<Loans_Mutation_Response>;
  /** update single row of the table: "loans" */
  update_loans_by_pk?: Maybe<Loans>;
  /** update data of the table: "members" */
  update_members?: Maybe<Members_Mutation_Response>;
  /** update single row of the table: "members" */
  update_members_by_pk?: Maybe<Members>;
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
export type Mutation_RootDelete_LibrariesArgs = {
  where: Libraries_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Libraries_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Library_BooksArgs = {
  where: Library_Books_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Library_Books_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Library_MembersArgs = {
  where: Library_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Library_Members_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_LoansArgs = {
  where: Loans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Loans_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_MembersArgs = {
  where: Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Members_By_PkArgs = {
  id: Scalars['uuid'];
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
export type Mutation_RootInsert_LibrariesArgs = {
  objects: Array<Libraries_Insert_Input>;
  on_conflict?: InputMaybe<Libraries_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraries_OneArgs = {
  object: Libraries_Insert_Input;
  on_conflict?: InputMaybe<Libraries_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Library_BooksArgs = {
  objects: Array<Library_Books_Insert_Input>;
  on_conflict?: InputMaybe<Library_Books_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Library_Books_OneArgs = {
  object: Library_Books_Insert_Input;
  on_conflict?: InputMaybe<Library_Books_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Library_MembersArgs = {
  objects: Array<Library_Members_Insert_Input>;
  on_conflict?: InputMaybe<Library_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Library_Members_OneArgs = {
  object: Library_Members_Insert_Input;
  on_conflict?: InputMaybe<Library_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LoansArgs = {
  objects: Array<Loans_Insert_Input>;
  on_conflict?: InputMaybe<Loans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Loans_OneArgs = {
  object: Loans_Insert_Input;
  on_conflict?: InputMaybe<Loans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MembersArgs = {
  objects: Array<Members_Insert_Input>;
  on_conflict?: InputMaybe<Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Members_OneArgs = {
  object: Members_Insert_Input;
  on_conflict?: InputMaybe<Members_On_Conflict>;
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
export type Mutation_RootUpdate_LibrariesArgs = {
  _set?: InputMaybe<Libraries_Set_Input>;
  where: Libraries_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Libraries_By_PkArgs = {
  _set?: InputMaybe<Libraries_Set_Input>;
  pk_columns: Libraries_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Library_BooksArgs = {
  _inc?: InputMaybe<Library_Books_Inc_Input>;
  _set?: InputMaybe<Library_Books_Set_Input>;
  where: Library_Books_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Library_Books_By_PkArgs = {
  _inc?: InputMaybe<Library_Books_Inc_Input>;
  _set?: InputMaybe<Library_Books_Set_Input>;
  pk_columns: Library_Books_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Library_MembersArgs = {
  _set?: InputMaybe<Library_Members_Set_Input>;
  where: Library_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Library_Members_By_PkArgs = {
  _set?: InputMaybe<Library_Members_Set_Input>;
  pk_columns: Library_Members_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_LoansArgs = {
  _set?: InputMaybe<Loans_Set_Input>;
  where: Loans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Loans_By_PkArgs = {
  _set?: InputMaybe<Loans_Set_Input>;
  pk_columns: Loans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_MembersArgs = {
  _set?: InputMaybe<Members_Set_Input>;
  where: Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Members_By_PkArgs = {
  _set?: InputMaybe<Members_Set_Input>;
  pk_columns: Members_Pk_Columns_Input;
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
  /** An array relationship */
  books: Array<Books>;
  /** An aggregate relationship */
  books_aggregate: Books_Aggregate;
  /** fetch data from the table: "books" using primary key columns */
  books_by_pk?: Maybe<Books>;
  /** fetch data from the table: "libraries" */
  libraries: Array<Libraries>;
  /** fetch aggregated fields from the table: "libraries" */
  libraries_aggregate: Libraries_Aggregate;
  /** fetch data from the table: "libraries" using primary key columns */
  libraries_by_pk?: Maybe<Libraries>;
  /** An array relationship */
  library_books: Array<Library_Books>;
  /** An aggregate relationship */
  library_books_aggregate: Library_Books_Aggregate;
  /** fetch data from the table: "library_books" using primary key columns */
  library_books_by_pk?: Maybe<Library_Books>;
  /** fetch data from the table: "library_members" */
  library_members: Array<Library_Members>;
  /** An aggregate relationship */
  library_members_aggregate: Library_Members_Aggregate;
  /** fetch data from the table: "library_members" using primary key columns */
  library_members_by_pk?: Maybe<Library_Members>;
  /** An array relationship */
  loans: Array<Loans>;
  /** An aggregate relationship */
  loans_aggregate: Loans_Aggregate;
  /** fetch data from the table: "loans" using primary key columns */
  loans_by_pk?: Maybe<Loans>;
  /** fetch data from the table: "members" */
  members: Array<Members>;
  /** fetch aggregated fields from the table: "members" */
  members_aggregate: Members_Aggregate;
  /** fetch data from the table: "members" using primary key columns */
  members_by_pk?: Maybe<Members>;
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


export type Query_RootLibrariesArgs = {
  distinct_on?: InputMaybe<Array<Libraries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Libraries_Order_By>>;
  where?: InputMaybe<Libraries_Bool_Exp>;
};


export type Query_RootLibraries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Libraries_Order_By>>;
  where?: InputMaybe<Libraries_Bool_Exp>;
};


export type Query_RootLibraries_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLibrary_BooksArgs = {
  distinct_on?: InputMaybe<Array<Library_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Books_Order_By>>;
  where?: InputMaybe<Library_Books_Bool_Exp>;
};


export type Query_RootLibrary_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Library_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Books_Order_By>>;
  where?: InputMaybe<Library_Books_Bool_Exp>;
};


export type Query_RootLibrary_Books_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLibrary_MembersArgs = {
  distinct_on?: InputMaybe<Array<Library_Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Members_Order_By>>;
  where?: InputMaybe<Library_Members_Bool_Exp>;
};


export type Query_RootLibrary_Members_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Library_Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Members_Order_By>>;
  where?: InputMaybe<Library_Members_Bool_Exp>;
};


export type Query_RootLibrary_Members_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootLoansArgs = {
  distinct_on?: InputMaybe<Array<Loans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Loans_Order_By>>;
  where?: InputMaybe<Loans_Bool_Exp>;
};


export type Query_RootLoans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Loans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Loans_Order_By>>;
  where?: InputMaybe<Loans_Bool_Exp>;
};


export type Query_RootLoans_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMembersArgs = {
  distinct_on?: InputMaybe<Array<Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Members_Order_By>>;
  where?: InputMaybe<Members_Bool_Exp>;
};


export type Query_RootMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Members_Order_By>>;
  where?: InputMaybe<Members_Bool_Exp>;
};


export type Query_RootMembers_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename: 'subscription_root';
  /** fetch data from the table: "authors" */
  authors: Array<Authors>;
  /** fetch aggregated fields from the table: "authors" */
  authors_aggregate: Authors_Aggregate;
  /** fetch data from the table: "authors" using primary key columns */
  authors_by_pk?: Maybe<Authors>;
  /** An array relationship */
  books: Array<Books>;
  /** An aggregate relationship */
  books_aggregate: Books_Aggregate;
  /** fetch data from the table: "books" using primary key columns */
  books_by_pk?: Maybe<Books>;
  /** fetch data from the table: "libraries" */
  libraries: Array<Libraries>;
  /** fetch aggregated fields from the table: "libraries" */
  libraries_aggregate: Libraries_Aggregate;
  /** fetch data from the table: "libraries" using primary key columns */
  libraries_by_pk?: Maybe<Libraries>;
  /** An array relationship */
  library_books: Array<Library_Books>;
  /** An aggregate relationship */
  library_books_aggregate: Library_Books_Aggregate;
  /** fetch data from the table: "library_books" using primary key columns */
  library_books_by_pk?: Maybe<Library_Books>;
  /** fetch data from the table: "library_members" */
  library_members: Array<Library_Members>;
  /** An aggregate relationship */
  library_members_aggregate: Library_Members_Aggregate;
  /** fetch data from the table: "library_members" using primary key columns */
  library_members_by_pk?: Maybe<Library_Members>;
  /** An array relationship */
  loans: Array<Loans>;
  /** An aggregate relationship */
  loans_aggregate: Loans_Aggregate;
  /** fetch data from the table: "loans" using primary key columns */
  loans_by_pk?: Maybe<Loans>;
  /** fetch data from the table: "members" */
  members: Array<Members>;
  /** fetch aggregated fields from the table: "members" */
  members_aggregate: Members_Aggregate;
  /** fetch data from the table: "members" using primary key columns */
  members_by_pk?: Maybe<Members>;
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


export type Subscription_RootLibrariesArgs = {
  distinct_on?: InputMaybe<Array<Libraries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Libraries_Order_By>>;
  where?: InputMaybe<Libraries_Bool_Exp>;
};


export type Subscription_RootLibraries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Libraries_Order_By>>;
  where?: InputMaybe<Libraries_Bool_Exp>;
};


export type Subscription_RootLibraries_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLibrary_BooksArgs = {
  distinct_on?: InputMaybe<Array<Library_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Books_Order_By>>;
  where?: InputMaybe<Library_Books_Bool_Exp>;
};


export type Subscription_RootLibrary_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Library_Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Books_Order_By>>;
  where?: InputMaybe<Library_Books_Bool_Exp>;
};


export type Subscription_RootLibrary_Books_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLibrary_MembersArgs = {
  distinct_on?: InputMaybe<Array<Library_Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Members_Order_By>>;
  where?: InputMaybe<Library_Members_Bool_Exp>;
};


export type Subscription_RootLibrary_Members_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Library_Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Library_Members_Order_By>>;
  where?: InputMaybe<Library_Members_Bool_Exp>;
};


export type Subscription_RootLibrary_Members_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootLoansArgs = {
  distinct_on?: InputMaybe<Array<Loans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Loans_Order_By>>;
  where?: InputMaybe<Loans_Bool_Exp>;
};


export type Subscription_RootLoans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Loans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Loans_Order_By>>;
  where?: InputMaybe<Loans_Bool_Exp>;
};


export type Subscription_RootLoans_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMembersArgs = {
  distinct_on?: InputMaybe<Array<Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Members_Order_By>>;
  where?: InputMaybe<Members_Bool_Exp>;
};


export type Subscription_RootMembers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Members_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Members_Order_By>>;
  where?: InputMaybe<Members_Bool_Exp>;
};


export type Subscription_RootMembers_By_PkArgs = {
  id: Scalars['uuid'];
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    seed_authors(variables: Seed_AuthorsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Seed_AuthorsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Seed_AuthorsMutation>(Seed_AuthorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'seed_authors');
    },
    remove_authors(variables?: Remove_AuthorsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Remove_AuthorsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Remove_AuthorsMutation>(Remove_AuthorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'remove_authors');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;