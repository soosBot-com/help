import { useEffect, useState } from "react";
import axios from "axios";
import Command from "./components/Command";
import "./style/style.css";

function App() {
  const [commandData, setCommandData] = useState(null);

  useEffect(() => {
    let cmd_data = {}
    axios.get("https://cdn.soosbot.com/help/commands.json").then(response => {
      for (const command in response.data) {
        // Loop through each command, and check the category of the command. Then add the category to the cmd_data object, and append the command to the category.
        if (response.data[command].category in cmd_data) {
          cmd_data[response.data[command].category].push(response.data[command]);
        }
        else {
          cmd_data[response.data[command].category] = [response.data[command]];
        }
      }
      setCommandData(cmd_data);

    }
    )
  }, [])
  if (!commandData) {
    return <div>Loading...</div>
  }

  return (
    <>
    <h1>Commands</h1>
    <div className="commands">
      {Object.keys(commandData).map(category => {
        return (
          <div className="category" key={category}>
            <h2>{category}</h2>
            {commandData[category].map(command => {
              return <Command key={command.aliases} {...command} name={command.aliases[0]}/>
            })}
          </div>
        )
      })}
    </div>
    </>
  );

}

export default App;
