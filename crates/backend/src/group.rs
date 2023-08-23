use crate::{model::NewGroup, error::HttpErrorResponse};

use actix_web::{web, HttpResponse};
use bson::oid::ObjectId;
use futures::TryStreamExt;
use mongodb::{bson::doc, Client, Collection};

const DB_NAME: &str = "sankar";
const COLL_NAME: &str = "groups";

/// Adds a new post to the "posts" collection in the database.
pub async fn add_group(client: web::Data<Client>, form: web::Json<NewGroup>) -> HttpResponse {
    let collection = client.database(DB_NAME).collection(COLL_NAME);
    let result = collection.insert_one(form.into_inner(), None).await;
    match result {
        Ok(_) => HttpResponse::Ok().body("post added"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn get_group(client: web::Data<Client>, group_id: web::Path<String>) -> HttpResponse {
    let group_id = match ObjectId::parse_str(group_id.as_str()) {
        Ok(d) => d,
        Err(e) => return HttpResponse::InternalServerError().body(e.to_string()),
    };
    let collection: Collection<NewGroup> = client.database(DB_NAME).collection(COLL_NAME);
    match collection.find_one(doc! { "_id": &group_id }, None).await {
        Ok(Some(post)) => HttpResponse::Ok().json(post),
        Ok(None) => HttpResponse::NotFound().body(format!("No post found with postname {group_id}")),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn get_groups(client: web::Data<Client>) -> Result<HttpResponse, HttpErrorResponse> {
    let collection: Collection<NewGroup> = client.database(DB_NAME).collection(COLL_NAME);
    match collection.find(None, None).await {
        Ok(mut post) => {
            let mut x = Vec::new();
            while let Some(book) = post.try_next().await? {
                x.push(book);
            }
            return Ok(HttpResponse::Ok().json(x));
        }
        Err(err) => Err(HttpErrorResponse::from(err.to_string())),
    }
}
