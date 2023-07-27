import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import wordsToNumbers from "words-to-numbers";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards.js";
import { styled } from "@mui/material/styles";




const LogoContainer = styled("div")(({ theme }) => ({
  padding: "0 5%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    textAlign: "center",
  },
}));



const InfoContainer = styled("div")(({ theme }) => ({
  
  gradient: "linear-gradient(45deg,  #FFA07A, #21CBF3 )",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Card = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  padding: "3%",
  borderRadius: 10,
  color: "white",
  backgroundColor: "rgba(21, 101, 192)",
  margin: "0 12px",
  textAlign: "center",
  height: "25vmin",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    textAlign: "center",
    width: "100%",
    height: "initial",
    "&:nth-of-type(1)": {
      marginBottom: "12px",
    },
  },
}));

const LogoImg = styled("img")(({ theme }) => ({
  height: "35vmin",
  borderRadius: "15%",
  padding: "0 5%",
  margin: "3% 0",
  [theme.breakpoints.down("sm")]: {
    height: "65vmin",
  },
}));

const Footer = styled("div")(({ theme }) => ({
  textAlign: "center",
  position: "fixed",
  left: 0,
  bottom: 0,
  color: "black",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "120px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);

  let alanBtnInstance;

useEffect(() => {
  if (alanBtnInstance) {
    alanBtnInstance.deactivate();
  }
    alanBtnInstance = alanBtn({
      key: "cee466f166ca6a4e77d6c3a66f0f3b442e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtnInstance.playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtnInstance.playText("Opening...");
          } else {
            alanBtnInstance.playText("Please try that again...");
          }
        }
      },
    });

  return () => {
    if (alanBtnInstance) {
      alanBtnInstance.deactivate();
    }
  };
}, [alanBtnInstance]);


  return (
    <div>

      <LogoContainer>
        {newsArticles.length ? (
         
          <InfoContainer>
            <Card>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </Card>
            <Card>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </Card>
          </InfoContainer>
        ) : null}
        <LogoImg
          src="https://i.imgur.com/IXYUDZY.png"
          alt="logo"
        />
      </LogoContainer>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      {!newsArticles.length ? (
        <Footer>
          <Typography style={{ color: '#8AC0F5' }} variant="body1" component="h2">
          </Typography>
        </Footer>
      ) : null}
      <div className="app-container">
      
    </div>
    </div>
  );
};

export default App;