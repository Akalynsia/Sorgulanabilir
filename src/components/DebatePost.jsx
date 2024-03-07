import { useState } from "react";
import PostComments from "./PostComments";
import PostContent from "./PostContent";
import postData from "../postData";

export default function DebatePost() {
  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir. 
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/

  const [comments, setComments] = useState(postData.comments);
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log("Username:", event.target.value);
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
    console.log("Comment Text:", event.target.value);
  };

  const handleAnonymousChange = (event) => {
    setIsAnonymous(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !commentText) {
      console.log("Username or comment text cannot be empty");
      return;
    }

    const newComment = {
      id: crypto.randomUUID(),
      userName: isAnonymous ? "AnonimKullanıcı" : username,
      commentText: commentText,
    };

    setComments([...comments, newComment]);

    setUsername("");
    setCommentText("");
    setIsAnonymous(false);
  };

  return (
    <div className="post-container">
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          placeholder="Kullanıcı adı girin."
          value={username}
          onChange={handleUsernameChange}
        />
        <textarea
          placeholder="Ne düşünüyorsunuz?"
          value={commentText}
          onChange={handleCommentTextChange}
        />
        <label>
          <input
            className="checkbox"
            type="checkbox"
            checked={isAnonymous}
            onChange={handleAnonymousChange}
          />
          İsimsiz mi göndereyim?
        </label>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
}
