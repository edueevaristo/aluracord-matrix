function GlobalStyle() {
    return (
        <style global jsx>{`
        
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        -ms-overflow-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
        
      }

      ::-webkit-scrollbar {
        width: 12px;              
        
      }
      
      ::-webkit-scrollbar-track {
        background: #FFFFFF;
        border-radius: 5px;         
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: #FFBA08;    
        border-radius: 10px;       
        border: 2px solid "#FFFFFF";  
      }
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }

    
      
    `}</style>
    );
}

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}