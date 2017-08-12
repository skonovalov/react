import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class RecipeItem extends React.Component {
    constructor(props) {
        super(props);

        this.toggleVisible = this.toggleVisible.bind(this);
    }

    render() {
        return(
            <div>
                {
                    this.props.recipes.map((item) => {
                        return(
                            <div key={item.id} className="recipe-item">
                                <span
                                    className="title" onClick={this.toggleVisible}>
                                    {item.name}
                                </span>
                                <div className="list-container">
                                    <ul >
                                        {
                                            item.ingridients.map((elem, index) => {
                                                return <li key={index} className="list-item">{elem}</li>
                                            })
                                        }
                                    </ul>
                                    <button
                                        data-id={item.id}
                                        onClick={this.props.edit}>
                                        Edit
                                    </button>
                                    <button
                                        className="delete"
                                        data-id={item.id}
                                        onClick={this.props.remove}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    toggleVisible(event) {
        event.target.nextSibling.classList.toggle('visible');
    }
}
