# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_name|VARCHAR(255)|index: true, null: false unique: true|
|email|VARCHAR(255)|null: false, unique: true|
### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|VARCHAR(255)|index: true, null: false|
### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message_body|VARCHAR(255)|null: false|
|image_url|VARCHAR(255)||
|user_id|INT|null: false, foreign_key: true|
|group_id|INT|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group


* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
