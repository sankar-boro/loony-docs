use crate::model::Post;

use actix_web::{web, HttpResponse};
use bson::oid::ObjectId;
use mongodb::{bson::doc, Client, Collection};

const DB_NAME: &str = "sankar";
const COLL_NAME: &str = "posts";

/// Adds a new post to the "posts" collection in the database.
pub async fn add_post(client: web::Data<Client>, form: web::Form<Post>) -> HttpResponse {
    let collection = client.database(DB_NAME).collection(COLL_NAME);
    let result = collection.insert_one(form.into_inner(), None).await;
    match result {
        Ok(_) => HttpResponse::Ok().body("post added"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn get_post(client: web::Data<Client>, post_id: web::Path<String>) -> HttpResponse {
    let post_id = match ObjectId::parse_str(post_id.as_str()) {
        Ok(d) => d,
        Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
    };
    let collection: Collection<Post> = client.database(DB_NAME).collection(COLL_NAME);
    match collection.find_one(doc! { "_id": &post_id }, None).await {
        Ok(Some(post)) => HttpResponse::Ok().json(post),
        Ok(None) => HttpResponse::NotFound().body(format!("No post found with postname {post_id}")),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
