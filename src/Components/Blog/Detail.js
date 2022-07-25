import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import ListComment from "./ListComment";
import Rate from "./Rate";

function Detail(props) {
    let params = useParams();

    const [data, setData] = useState("");
    const [comments, setComments] = useState("");
    const [replays, setReplays] = useState(0);
    useEffect(() => {
        axios
            .get("http://localhost/laravel/public/api/blog/detail/" + params.id)
            .then((res) => {
                setData(res.data.data);
                setComments(res.data.data.comment)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    function getComment(res) {   //dua cmt len khong can reload
        setComments(res.concat(comments))
    }
    function getReplay(res) {
        setReplays(res)
    }
    // console.log(replays)


    function feetchData() {
        return (
            <div className="single-blog-post">
                <h3>{data.title}</h3>
                <div className="post-meta">
                    <ul>
                        <li>
                            <i className="fa fa-user" /> Mac Doe
                        </li>
                        <li>
                            <i className="fa fa-clock-o" /> 1:33 pm
                        </li>
                        <li>
                            <i className="fa fa-calendar" /> DEC 5, 2013
                        </li>
                    </ul>

                    {/* Rate */}
                    <Rate idBlog={params.id} />
                    {/* Rate */}

                </div>
                <a href>
                    <img
                        src={
                            "http://localhost/laravel/public/upload/Blog/image/" + data.image
                        }
                        alt=""
                    />
                </a>
                <p>{data.content}</p>

                <div className="pager-area">
                    <ul className="pager pull-right">
                        <li>
                            <a href="abc">Pre</a>
                        </li>
                        <li>
                            <a href="acb">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Latest From our Blog</h2>
                            {feetchData()}
                        </div>
                        {/*/blog-post-area*/}
                        <div className="rating-area">

                            <ul className="ratings">
                                <li className="rate-this">Rate this item:</li>
                                <li>
                                    <i className="fa fa-star color" />
                                    <i className="fa fa-star color" />
                                    <i className="fa fa-star color" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                </li>
                                <li className="color">(6 votes)</li>
                            </ul>
                            <ul className="tag">
                                <li>TAG:</li>
                                <li>
                                    <a className="color" href>
                                        Pink <span>/</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="color" href>
                                        T-Shirt <span>/</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="color" href>
                                        Girls
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/*/rating-area*/}
                        <div className="socials-share">
                            <a href>
                                <img src="images/blog/socials.png" alt="" />
                            </a>
                        </div>
                        {/* /socials-share*/}
                        <div className="media commnets">
                            <a className="pull-left" href="abc">
                                <img
                                    className="media-object"
                                    src="images/blog/man-one.jpg"
                                    alt=""
                                />
                            </a>
                            <div className="media-body">
                                <h4 className="media-heading">Annie Davis</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <div className="blog-socials">
                                    <ul>
                                        <li>
                                            <a href>
                                                <i className="fa fa-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href>
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href>
                                                <i className="fa fa-dribbble" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href>
                                                <i className="fa fa-google-plus" />
                                            </a>
                                        </li>
                                    </ul>
                                    <a className="btn btn-primary" href>
                                        Other Posts
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/*Comments */}

                        <ListComment comments={comments} getComment={getComment} getReplay={getReplay} />


                        {/*/Response-area*/}

                        <Comments idBlog={params.id} getComment={getComment} getReplay={getReplay} replays={replays} />

                        {/*/Repaly Box*/}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Detail;
