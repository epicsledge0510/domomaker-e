const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const level = e.target.querySelector('#domoLevel').value;

    
    if(!name || !age || !level){
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age, level}, loadDomosFromServer);

    return false;
}

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            onSubmit={handleDomo}
            name="domoMaker"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" name="age" min="0"/>
            <label htmlFor="level">Level: </label>
            <input id="domoLevel" type="number" name="level" min="0"/>
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = (props) => {
    if(props.domos.length === 0){
        return (
            <div className="domoList">
                <h3 classname="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        console.log(domo)
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 classname="domoName">Name: {domo.name}</h3>
                <h3 classname="domoAge">Age: {domo.age}</h3>
                <h3 classname="domoLevel">Level: {domo.level}</h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
}

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    )
}

const init = () => {
    ReactDOM.render(
        <DomoForm />,
        document.getElementById('makeDomo')
    );


    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );
    
    loadDomosFromServer();
};

window.onload = init;