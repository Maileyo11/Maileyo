// import React, { useEffect, useState } from "react";
// import axios from "axios";


const EmailDisplay = () => {
  // const[sender,setsender]= useState("Mentra")
  // const [emails, setEmails] = useState([]);

  // useEffect(() => {
  //   const fetchEmails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8000/api/v1/search/emails/sender?sender=${sender}`
  //       );
  //       setEmails(response.data.emails || []);
  //     } catch (error) {
  //       console.error("Error fetching emails:", error);
  //     }
  //   };

  //   fetchEmails();
  // }, [sender]);

  return (
    <div>
      {/* {emails.map((email) => (
        <div key={email?.id} className="email">
          <h2>Email ID: {email?.id}</h2>
          <div
            className="email-content"
            dangerouslySetInnerHTML={{ __html: email?.payload }}
          />
        </div>
      ))}
       */}
    </div>
  );
};

export default EmailDisplay;
