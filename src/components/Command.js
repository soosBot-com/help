import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import ReactMarkdown from 'react-markdown'


function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
}

function Command({ name, description, usage, aliases, example}) {
    const [opened, setOpened] = useState(false);
    const commandDropdown = useRef(null);
    return (
        <motion.div className="command" ref={commandDropdown} onClick={() => setOpened(!opened)}
        animate={{ opacity: 1, maxHeight: opened ? "15em" : "3em" }}
        transition={{type:"spring", duration: 0.4, velocity:3, damping:8, stiffness:80 }}>
            <h3>{titleCase(name)}</h3>
            {
                description.split("\n").map(function(item, idx) {
                    let shouldBreak = false;
                    // if the index is the last item and there is more than 1 line, then we should break
                    if (idx === description.split("\n").length - 1 && description.split("\n").length > 2) {
                        shouldBreak = true;
                    }
                    return (
                        <span key={idx}>
                            <ReactMarkdown>{item}</ReactMarkdown>
                            {
                                shouldBreak && <br/>
                            }
                        </span>
                        )
                })
            }
        </motion.div>
    );
}

export default Command;