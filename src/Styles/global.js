import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    *{ 
        box-sizing:border-box;
    }
    body{
        background:${({ theme }) => theme.background};
        color:${({ theme }) => theme.textColor};
        margin:0;
        padding:0;
        transition: all 0.25s linear;
    }

    //in <TypingBox/> component we use Grid layout for alignment properly.

    .grid-box{
        display:grid;
        grid-auto-flow:row;
        grid-teplate-row:auto 1fr auto;
        text-align:center;
        align-items:center;
        justify-content:space-between;
        text-align:center;
        min-height:100vh;
        width:100vw;
        margin-left:auto;
        margin-right:auto;
        gap:0.5rem;
        padding:2rem;
 
    }
    //
    .typing-box-div{
        width:100vw;
        // overflow:hidden;
    }

    //the span contain the word here we apply the margin:5px to space between the words.
    .span-inner{
        margin:5px;
    }

//this is outer div which make the whole div at the cener that makes the user-interface more better.
    .outer-typing-div{
        width:1000px;
        margin-right:auto;
        margin-left:auto;
        overflow:hidden;

    }


//now in inner div before applying the style the words are overflow to make the all words are align properly we use 
//some properties see the code below.
    .inner-typing-div{
      
        display:flex;
        flex-wrap:wrap;
        font-size:1.5rem;
        color:${({ theme }) => theme.typeBoxText}
       
    }

    //when the page is load then we don't show the input-box.

    .input-div{
        opacity:0;
    }

    

    //this classname for the color is green.
    .green{
        color:${({ theme }) => theme.textColor};
    }
    //assname for the color is red.
    .red{
        color:red;
    }


    //code for the bliking the cursor at the start of the word in which user pointing to.

    .blinking-div{
        border-left:1px solid;
        animation:blink 2s infinite;
        animation-timing-function:ease;
        @keyframes blink {
            0% {border-left-color:${({ theme }) => theme.textColor};}
            25%{border-left-color:${({ theme }) => theme.background};}
            50% {border-left-color:${({ theme }) => theme.textColor};}
            75%{border-left-color:${({ theme }) => theme.background};}
            100% {border-left-color:${({ theme }) => theme.textColor};}
          }
    }

    //cursor blinking at the right.

    .blinking-right{
        border-right:1px solid;
        animation:blinkRight 2s infinite;
        animation-timing-function:ease;
        @keyframes blinkRight {
            0% {border-right-color:${({ theme }) => theme.textColor};}
            25%{border-right-color:${({ theme }) => theme.background};}
            50% {border-right-color:${({ theme }) => theme.textColor};}
            75%{border-right-color:${({ theme }) => theme.background};}
            100% {border-right-color:${({ theme }) => theme.textColor};}
          }
    }


    //styling for the <UpperComponen/> 

    .counter-container{
        display:flex;
        width:1000px;
        margin-left:auto;
        margin-right:auto;
        align-item:center;
        justify-content:space-between;
        padding:1.2rem;
        font-size:1.3rem;
    }
    
    .outer-container-timer{
        display:flex;
        gap:1rem;
    }

    .inner-div:hover{
       color:green;
        cursor:pointer;
    }


    //styling for the footer.

    .footer{
        display:flex;
        justify-content:space-between;
        width:1000px;
        margin-left:auto;
        margin-right:auto;

    }

    //styling for the result div <Stats/>
    .stat-div{
        display:flex;
        width:1000px;
        height:auto;
        margin-left:auto;
        margin-right:auto;
        // padding:30px;
    }

    .left-stat-div{
        width:30%;
        padding:30px;
    }

    .right-stat-div{
        width:70%;
    }

    .title{
        font-size:20px;
        color:${({ theme }) => theme.typeBoxText};
    }

    .subtitle{
        font-size:28px;
    }

    //styling for the <Header/> component.

    .header{
        display:flex;
        justify-content:space-between;
        width:1000px;
        margin:auto;
    }

    //styling for the table.
    .table{
        width:1000px; 
        text-align:center;
        margin-left:auto;
        margin-right:auto;
    }

    .inner-grid{
        text-align:center;
        width:900px;
        margin-left:220px;
        margin-right:auto;
    }

    //styling for the <UserInfo/>

    .user-info{
        width:1000px;
        margin:auto;
        display:flex;
        height:15rem;
        background:${({ theme }) => theme.typeBoxText};
        border-radius:20px;
        padding:1rem;
        justify-content:center;
        align-text:center;
    }

    .user{
        width:50%;
        display:flex;
        gap:4rem;
        border-right:2px solid;
    }

    .info{
        // margin:auto;
        position:relative;
        top:75px;
        font-size:1.3rem;
    }

    .total-tests{
        width:20%;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:1.5rem;
        margin:100px;
    }

    //for loading animation.
    .center-of-screen{
        display:flex;
        min-height:100vh;
        justify-content:center;
        align-items:center;
    }

`