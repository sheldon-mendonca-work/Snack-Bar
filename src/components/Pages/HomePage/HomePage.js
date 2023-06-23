import { useContext, useState } from "react";
import { ProductContext } from "../../../contexts/ProductContext";
import './HomePage.css'

// productList
// searchProduct

const HomePage = () => {

    const { productState, dispatchProduct } = useContext(ProductContext);
    const { productList, searchProduct } = productState;
    const [ sortTable, setSortTable ] = useState({field: 'id', type: true});
    
    const getProductTable = () => {
        let tempProductList = productList;

        if(searchProduct.length > 0){
            tempProductList = tempProductList.filter(({product_name, ingredients}) => (
                product_name.toLowerCase().indexOf(searchProduct) !== -1
                ||
                ingredients.some(item => item.toLowerCase().indexOf(searchProduct) !== -1)

            ))
        }

        switch (sortTable.field) {
            case 'id':
                return tempProductList.sort((a,b) => (sortTable.type ? a.id > b.id : b.id > a.id));

            case 'name':
                return tempProductList.sort((a,b) => (sortTable.type ? a.product_name > b.product_name : b.product_name > a.product_name));  
                
            case 'weight':
                return tempProductList.sort((a,b) => (sortTable.type ? a.product_weight > b.product_weight : b.product_weight > a.product_weight));

            case 'price':
                return tempProductList.sort((a,b) => (sortTable.type ? a.price > b.price : b.price > a.price));

            case 'calories':
                return tempProductList.sort((a,b) => (sortTable.type ? a.calories > b.calories : b.calories > a.calories));

            case 'ingredients':
                return tempProductList.sort((a,b) => (sortTable.type ? a.ingredients > b.ingredients : b.ingredients > a.ingredients));
        
            default:
                return productList;
        }
    }
    const idSortHandler = () => {
        if(sortTable.field === 'id'){
            setSortTable(prevState =>({field: 'id', type: !prevState.type}))
        }else{
            setSortTable({field: 'id', type: true});
        }
    }

    const nameSortHandler = () => {
        if(sortTable.field === 'name'){
            setSortTable(prevState =>({field: 'name', type: !prevState.type}))
        }else{
            setSortTable({field: 'name', type: true});
        }
    }

    const weightSortHandler = () => {
        if(sortTable.field === 'weight'){
            setSortTable(prevState =>({field: 'weight', type: !prevState.type}))
        }else{
            setSortTable({field: 'weight', type: true});
        }
    }

    const priceSortHandler = () => {
        if(sortTable.field === 'price'){
            setSortTable(prevState =>({field: 'price', type: !prevState.type}))
        }else{
            setSortTable({field: 'price', type: true});
        }
    }

    const caloriesSortHandler = () => {
        if(sortTable.field === 'calories'){
            setSortTable(prevState =>({field: 'calories', type: !prevState.type}))
        }else{
            setSortTable({field: 'calories', type: true});
        }
    }

    const ingredientsSortHandler = () => {
        if(sortTable.field === 'ingredients'){
            setSortTable(prevState =>({field: 'ingredients', type: !prevState.type}))
        }else{
            setSortTable({field: 'ingredients', type: true});
        }
    }



    const searchInputHandler = (event) => {
        dispatchProduct({type: 'UPDATE_SEARCH_BAR', value: event.target.value.trim().toLowerCase()});
    }
    
    return <div>
        <h1>Snack Bar</h1>
        <div className="snack-input-div" >
            <input type="text" placeholder="Search with Products or Ingredients..." value={ searchProduct } onChange={searchInputHandler} className="snack-input" />
        </div>
        <table>
            <thead>
                <tr>
                    <th onClick={idSortHandler} className={sortTable.field==='id' ? 'active' : 'inactive'}>
                        ID
                    </th>
                    <th onClick={nameSortHandler} className={sortTable.field==='name' ? 'active' : 'inactive'}>
                        Product Name
                    </th>
                    <th onClick={weightSortHandler} className={sortTable.field==='weight' ? 'active' : 'inactive'}>
                        Product Weight
                    </th>
                    <th onClick={priceSortHandler} className={sortTable.field==='price' ? 'active' : 'inactive'}>
                        Price (INR)
                    </th>
                    <th onClick={caloriesSortHandler} className={sortTable.field==='calories' ? 'active' : 'inactive'}>
                        Calories
                    </th>
                    <th onClick={ingredientsSortHandler} className={sortTable.field==='ingredients' ? 'active' : 'inactive'}>
                        Ingredients
                    </th>
                </tr>
            </thead>
            <tbody>
            {
                productList.length > 0 && getProductTable().map(item => {
                    const { id, product_name, product_weight, price, calories, ingredients } = item;
                    
                    return (<tr key={id}>
                        <td>{id}</td>
                        <td>{product_name}</td>
                        <td>{product_weight}</td>
                        <td>{price}</td>
                        <td>{calories}</td>
                        <td>{ingredients.join(', ')}</td>
                    </tr>)
                })
            }
            </tbody>
        </table>
    </div>
}

export default HomePage;

