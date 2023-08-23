use crate::{model, post, user};
use actix_web::web;

pub fn routes(config: &mut web::ServiceConfig) {
    config.route(
        "/create_collection",
        web::post().to(model::create_collection),
    );

    config.route("/add_user", web::post().to(user::add_user));
    config.route("/get_user/{user_id}", web::get().to(user::get_user));

    config.route("/add_post", web::post().to(post::add_post));
    config.route("/get_post/{post_id}", web::get().to(post::get_post));
    config.route("/get_posts", web::get().to(post::get_posts));
    config.route("/delete_post/{post_id}", web::post().to(post::delete_post));

}
