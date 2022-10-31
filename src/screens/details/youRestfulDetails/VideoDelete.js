const VideoDelete = `export const deleteVideo = async (req, res) => {
    const { id } = req.params; // req.params를 이용하여 해당 비디오의 ID를 받아옴
    const {
      user: { _id },
    } = req.session; // session에 저장된 현재 로그인된 유저의 ID를 받아옴

    const video = await Video.findById(id);
    const user = await User.findById(_id);
  // 받아온 ID들로 DB안의 유저와 비디오를 찾은후

    if (!video) {
      req.flash("info", "Video does not exist.");
      return res.status(404).render("404", { pageTitle: "Video not found." });
    } // 비디오의 존재 유무 확인
    if (String(video.owner) !== String(_id)) {
      //video.owner.toString()
      req.flash("error", "You are not the owner of this video.");
      return res.status(403).redirect("/");
    }// 비디오의 접근권한 확인

    await Video.findByIdAndDelete(id); // DB안의 비디오 모델을 삭제해준뒤
    user.videos.splice(user.videos.indexOf(id), 1);
    user.save(); // 해당유저의 DB안, videos array에서 삭제한 비디오의 ID를 제거 후 저장
    
    return res.redirect("/");
  };`;

export default VideoDelete;
