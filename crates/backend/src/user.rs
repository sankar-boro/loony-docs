use crate::model::User;

use actix_web::{web, HttpResponse};
use bson::oid::ObjectId;
use mongodb::{bson::doc, Client, Collection};

const DB_NAME: &str = "sankar";
const COLL_NAME: &str = "users";

/// Adds a new user to the "users" collection in the database.
pub async fn add_user(client: web::Data<Client>, form: web::Form<User>) -> HttpResponse {
    let collection = client.database(DB_NAME).collection(COLL_NAME);
    let result = collection.insert_one(form.into_inner(), None).await;
    match result {
        Ok(_) => HttpResponse::Ok().body("user added"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn get_user(client: web::Data<Client>, user_id: web::Path<String>) -> HttpResponse {
    let user_id = match ObjectId::parse_str(user_id.as_str()) {
        Ok(d) => d,
        Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
    };
    let collection: Collection<User> = client.database(DB_NAME).collection(COLL_NAME);
    match collection.find_one(doc! { "_id": &user_id }, None).await {
        Ok(Some(user)) => HttpResponse::Ok().json(user),
        Ok(None) => HttpResponse::NotFound().body(format!("No user found with username {user_id}")),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
