export const getSynonymous = async (word) => {

    let response = await fetch(`https://api.datamuse.com/words?ml=${word}`)
    if (response.ok) {
        let json = await response.json();
        return json
    } else {
        console.log(response)
        return []
    }

};