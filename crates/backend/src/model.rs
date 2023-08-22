use actix_web::{web, HttpResponse};
use mongodb::{bson::doc, bson::oid::ObjectId, Client};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct User {
    pub fname: String,
    pub lname: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Post {
    pub title: String,
    pub body: String,
    pub user_id: ObjectId,
    pub group: Option<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct NewCollection {
    pub name: String,
    pub dbname: String,
}

/// Adds a new user to the "users" collection in the database.
pub async fn create_collection(
    client: web::Data<Client>,
    form: web::Form<NewCollection>,
) -> HttpResponse {
    let collection = client
        .database(&form.dbname)
        .create_collection(&form.name, None)
        .await;
    match collection {
        Ok(_) => HttpResponse::Ok().body(format!("Created collection {}", &form.name)),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
