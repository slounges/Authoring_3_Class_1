async function fetchData(){
    let resource = await fetch('./DataSet.json').then(response => {
        // bang operator - means "does not equal" (or a false value)
        if (response.status !== 200) {
            throw new Error(`Errr! Error ${response.status}`);
        }

        return response; 
    })
   //if we get success then we can return back our resource after we parse it into plain JS
   let dataset = await resource.json();

   return dataset;
}

export {fetchData};