pub mod model;
pub mod post;
pub mod route;
pub mod user;
pub mod error;
pub mod group;

use actix_web::{web, App, HttpServer};
use actix_cors::Cors;
use mongodb::Client;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let uri = std::env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());

    let client = Client::with_uri_str(uri).await.expect("failed to connect");

    HttpServer::new(move || {
        App::new()
            .wrap(Cors::permissive())
            .app_data(web::Data::new(client.clone()))
            .configure(route::routes)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
