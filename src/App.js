import { useEffect, useState } from 'react';
import axios from "axios"


function App() {

  const [ langOptions, setLangOptions] = useState([])
  const [ fromLang, setFromLang] = useState("en")
  const [ toLang, setToLang] = useState("en")
  const [ langInput, setLangInput] = useState("")
  const [ langOutput, setLangOutput] = useState("")

  const [ errorMsg, setErrorMsg] = useState("")

  

  useEffect(() =>{
    axios.get("https://libretranslate.de/languages",
    {headers: {"accept": "application/json"}}).then(res => {
      console.log(res.data)
      setLangOptions(res.data)
    })
  },[])



   const translatButtonClicked = () => {

    if(langInput==="") {
      setErrorMsg("Text should not be empty !")
      setLangOutput("")
    }
    else{

    const params = new URLSearchParams();
    params.append('q', langInput);
    params.append('source', fromLang);
    params.append('target', toLang);
    params.append('api_key', "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios.post("https://libretranslate.de/translate",
    params,
    {headers: {"accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded"}}).then(res => {
      setLangOutput(res.data.translatedText)
      setErrorMsg("")
    })
    }
   }


   const InputChanged = (e) => {
      setLangInput(e.target.value)
      setErrorMsg("")
   }


  return (
    <div>
      <div className="heading-style">Text Translator</div>

      <div>
        <div className="selection-text-style">
          From Language : 
          <span className="selection-span-style">
            ({fromLang})
          </span>

          <select onChange={e=>setFromLang(e.target.value)} className="selection-style">
          {langOptions.map(val =><option key={val.code} value={val.code}>{val.name}</option>)}
          </select>
        </div>

        <div className="selection-text-style">
          To Language : 
          <span className="selection-span-style">
            ({toLang})
          </span>

          <select onChange={e=>setToLang(e.target.value)} className="selection-style">
          {langOptions.map(val =><option key={val.code} value={val.code}>{val.name}</option>)}
          </select>
        </div>
      </div>



      <div>
        <textarea className="textarea-style" cols="70" rows="7" onInput={InputChanged}></textarea>
      </div>


      <div>
        <textarea className="textarea-style" cols="70" rows="7" value={langOutput}></textarea>
      </div>

      <div>
        <button className="button-style" onClick={(e) =>translatButtonClicked()}>
          Translate
        </button>
      </div>

      <div className="error-msg-style">
        {errorMsg}
      </div>
    </div>
  );
}

export default App;
