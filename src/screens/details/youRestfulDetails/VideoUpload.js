export const VideoUpload = `videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(
    videoUpload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumb", maxCount: 1 },
    ]),
    postUpload
  ); // post request에서 "videoUpload" 미들웨어 실행 후 "postUpload"실행
`;

export const S3 = `import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  }, // AWS S3에서 access key와 secret access key를 받아 설정
});


const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "youtube-clone-2022/videos",
  acl: "public-read",
}); // multerS3를 이용하여 경로 등을 설정해준뒤 S3서버로 업로드

// 
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 100000000,
  },
  storage: s3VideoUploader
}); // multer를 이용하여 프론트엔드에서 받아온 파일을 multerS3로 넘겨줌
`;

export const PostUpload = `export const postUpload = async (req, res) => {
    const {
      user: { _id },
    } = req.session;
    const { title, description, hashtags } = req.body;
    const { video, thumb } = req.files; // multer를 이용해서 받은 파일 정보
    try {
      // 프론트엔드에서 받은 form의 입력정보와 multer를 이용해서 받은 파일정보를이용하여
      //Video 모델생성
      const newVideo = await Video.create({
        title,
        description,
        thumbUrl: isHeroku ? thumb[0].location,
        fileUrl: isHeroku ? video[0].location,
        owner: _id,
        hashtags: Video.formatHashtags(hashtags),
      });

      // session에 저장된 유저를 DB에서 찾아준뒤 업로드한 비디오 모델의 id를 해당유저 DB에 입력후 저장
      const user = await User.findById(_id);
      user.videos.push(newVideo._id);
      user.save();
      return res.redirect("/");
      
    } catch (error) {
      return res.status(400).render("upload", {
        pageTitle: "Upload Video",
        errorMessage: error._message,
      });
    }
  };
  `;
