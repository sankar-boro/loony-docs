use crate::{model, post, user, group};
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
    config.route("/get_posts/withGroupName/{name}", web::get().to(post::get_posts));
    config.route("/delete_post/{post_id}", web::post().to(post::delete_post));
    config.route("/update_post", web::post().to(post::update_post));


    config.route("/add_group", web::post().to(group::add_group));
    config.route("/get_group/{group_id}", web::get().to(group::get_group));
    config.route("/get_groups", web::get().to(group::get_groups));
    
}
