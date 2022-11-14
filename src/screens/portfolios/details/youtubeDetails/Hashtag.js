const Hashtag = `export const handleHashtags = (description: string) => {
    // 비디오를 생성할때 description을 받은후 

    const hashtags = description.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
    //Regex를 이용하여 #이후의 글자만 추출

    return hashtags.map((hashtag) => ({
      where: { hashtag },
      create: { hashtag },
    })); // 각 해쉬태그마다 위의 양식대로 object를 만들어서 리턴후 해쉬태그 생성
  };
  `;

export default Hashtag;
