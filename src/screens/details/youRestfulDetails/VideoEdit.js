const VideoEdit =
  `export const postEdit = async (req, res) => {
    const { id } = req.params; // req.params를 통해 url에서 비디오의 ID를 받음
    const { title, description, hashtags } = req.body; // 프론트엔드 form에서 입력정보를 받음
    const video = await Video.findById(id); // params에서 받은 비디오ID로 DB에서 비디오를 찾음
    const {
      user: { _id },
    } = req.session; // 세션에 등록된 현재 로그인된 유저의 정보를 받음

    if (!video) {
      return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
      return res.status(403).redirect("/");
    } // 해당비디오와의 접근권한 확인

    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    }); //form 에서 받은 입력정보로 해당 비디오의 DB 수정

    return res.redirect(` +
  "`/videos/${id}`" +
  `); // req.params로 받은 비디오ID로 수정된 비디오 페이지로 redirect
  };`;

export default VideoEdit;
