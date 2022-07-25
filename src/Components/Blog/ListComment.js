/* eslint-disable array-callback-return */
import $ from 'jquery';
import React from 'react';

function ListComment(props) {

	const comments = props.comments;

	function Replay(e) {

		const id = e.target.id
		console.log(id)
		props.getReplay(id);

		$('html, body').animate({
			scrollTop: $(".comments").offset().top
		}, 1000);
	}

	function renderData(e) {

		if (comments.length > 0) {
			// console.log(comments)

			return comments.map(function (value, key) {
				let created_at = value.created_at.split(" ");

				if (value.id_comment == 0) {
				console.log(value)

					return (
						<React.Fragment key={key}>
							<li className="media">
								<a className="pull-left" href="abc">
									<img
										src={"http://localhost/laravel/public/upload/user/avatar/" +
											value.image_user}
										alt="" />
								</a>
								<div className="media-body">
									<ul className="sinlge-post-meta">
										<li>
											<i className="fa fa-user" />
											{value.name_user}
										</li>
										<li>
											<i className="fa fa-clock-o" /> {created_at[1]}
										</li>
										<li>
											<i className="fa fa-calendar" /> {created_at[0]}
										</li>
									</ul>
									<p>{value.comment}</p>
									<a
										id={value.id}
										className="btn btn-primary"
										onClick={Replay}
										href
									>
										<i className="fa fa-reply" />
										Replay
									</a>
								</div>
							</li>
							{comments.map((values, keys) => {

								if (value.id === values.id_comment) {
									let created_at = values.created_at.split(" ");

									return (
										<li key={keys} className="media second-media">
											<a className="pull-left" href="abc">
												<img
													src={"http://localhost/laravel/public/upload/user/avatar/" +
														values.image_user}
													alt="" />
											</a>
											<div className="media-body">
												<ul className="sinlge-post-meta">
													<li>
														<i className="fa fa-user" />
														{values.name_user}
													</li>
													<li>
														<i className="fa fa-clock-o" /> {created_at[1]}
													</li>
													<li>
														<i className="fa fa-calendar" /> {created_at[0]}
													</li>
												</ul>
												<p>{values.comment}</p>

											</div>
										</li>
									);
								}
							})}

						</React.Fragment>

					);

				}

			});
		}
	}

	return (
		<div className="response-area">
			<h2>2 RESPONSES</h2>
			<ul className="media-list">

				{renderData()}
			</ul>
		</div>
	);
}
export default ListComment;

// tu DETAIL truyen sang comment va set vao chỗ id_comment de gui qua APi
