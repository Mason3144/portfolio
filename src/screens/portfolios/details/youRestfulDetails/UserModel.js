const UserModel = `import mongoose from "mongoose";
import bcrypt from "bcrypt";

// mongoose instance생성으로 모델에 대한 shape 정의
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  // comment와 videos 모델들과 관계 형성
});

userSchema.pre("save", async function () {
    //class mongoose 메소드를 이용하여 "save"하기전에 비동기 함수 실행
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  } // 유저 모델을 생성하기 전에 bcrypt를 이용하여 password를 암호화 후 DB에 유저 생성
});

const User = mongoose.model("User", userSchema);
// 생성된 DB와 상호작용

export default User;
`;

export default UserModel;
