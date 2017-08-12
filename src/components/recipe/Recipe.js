import React from 'react';
import ReactModal from 'react-modal';

import RecipeItem from './recipeItem';

export default class Recipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            index: '',
            id: '',
            title: '',
            ingridients: '',
            showModal: false
        };

        this.addRecipe        = this.addRecipe.bind(this);
        this.getValue         = this.getValue.bind(this);
        this.handleOpenModal  = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleEdit       = this.handleEdit.bind(this);
        this.handleRemove     = this.handleRemove.bind(this);
    }

    render() {
        return (
            <div className="recipe">
                <div className="container">
                    <RecipeItem
                        recipes={this.state.recipes}
                        edit={this.handleEdit}
                        remove={this.handleRemove}/>
                </div>

                <div className="bottom">
                    <button onClick={this.handleOpenModal}>Add recipe</button>
                </div>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    className="Modal"
                    overlayClassName="Modal-Overlay">
                    <h2>Add recipe</h2>
                    <div className="input">
                        <input
                            name="title"
                            value={this.state.title}
                            onChange={this.getValue}
                            placeholder="Название рецепта" />
                    </div>
                    <div className="input">
                        <input
                            name="ingridients"
                            value={this.state.ingridients}
                            onChange={this.getValue}
                            placeholder="Введите ингридиенты"/>
                    </div>
                    <button onClick={this.addRecipe}>Add</button>
                    <button
                        onClick={this.handleCloseModal}
                        className="close">Close Modal</button>
                </ReactModal>
            </div>
        );
    }

    componentDidMount() {
        let items = localStorage.getItem('recipes');

        if (items) {
            this.setState({recipes: JSON.parse(items)});
        }
    }

    addRecipe() {
        let tmp, arr;

        if (! this.state.title || ! this.state.ingridients) {
            return;
        }

        tmp = this.state.ingridients.replace(/\s/g, ',').replace(/\,/g, ',');
        arr = this.state.recipes.slice();

        if (! this.state.index) {
            let id = Date.now();

            let newRecipe = {
                id,
                name       : this.state.title,
                ingridients: tmp.split(',').filter(Boolean)
            };

            arr.push(newRecipe);
        } else {
            let newRecipe = {
                id         : this.state.id,
                name       : this.state.title,
                ingridients: tmp.split(',').filter(Boolean)
            };

            arr.splice(this.state.index, 1, newRecipe);
        }

        this.setState({
            recipes: arr,
            title: '',
            ingridients: ''
        });

        localStorage.setItem('recipes', JSON.stringify(arr));
        this.handleCloseModal();
    }

    getValue(event) {
        let name = event.target.name;

        if (name === 'title') {
            this.setState({title:  event.target.value});
        } else {
            this.setState({ingridients:  event.target.value});
        }
    }

    handleOpenModal() {
        this.setState({
            showModal: true
        });
    }

    handleCloseModal(id) {
        this.setState({
            showModal: false
        });
    }

    handleEdit(event) {
        let id  = event.target.dataset.id;
        let arr = this.state.recipes.slice();

        for(let i = 0; i < arr.length; ++i) {
            if (arr[i].id == id) {
                this.setState({
                    title: arr[i].name,
                    ingridients: arr[i].ingridients.toString(),
                    index: i,
                    id
                });
            }
        }

        this.handleOpenModal();
    }

    handleRemove(event) {
        let id  = event.target.dataset.id;
        let arr = this.state.recipes.slice();

        for(let i = 0; i < arr.length; ++i) {
            if (arr[i].id == id) {
                arr.splice(i, 1);
            }
        }

        localStorage.setItem('recipes', JSON.stringify(arr));
        this.setState({recipes: arr});
    }
}
