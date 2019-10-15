import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';

// const name = 'Bella';
// const powers = [
// 	{ id: 0, title: 'Big Head', active: true },
// 	{ id: 1, title: 'Invisibility', active: true },
// 	{ id: 2, title: 'Fly', active: false },
// 	{ id: 3, title: 'Cuteness', active: false }
// ];

const styles = {
	root: {
		width: '100%',
		maxWidth: 360
	}
};

class App extends Component {
	constructor(props) {
		super(props);
		//create initial state
		this.state = {
			powers: [
				{ id: 0, title: 'Big Head', active: true },
				{ id: 1, title: 'Invisibility', active: true },
				{ id: 2, title: 'Fly', active: false },
				{ id: 3, title: 'Cuteness', active: false }
			],
			name: 'Bella'
		};
		this.powerInput = React.createRef();
	}

	getActivePowers = () => {
		return this.state.powers.filter((power) => power.active).length;
	};

	toggleActivated = (id) => {
		const updatedPowers = this.state.powers.map((power) => {
			if (power.id === id) {
				power.active = !power.active;
			}
			return power;
		});
		this.setState({ powers: updatedPowers });
	};

	deletePower = (id) => {
		const updatedPower = this.state.powers.filter((power) => power.id !== id);
		this.setState({ powers: updatedPower });
	};

	addPower = (event) => {
		event.preventDefault();

		const newPower = {
			id: this.state.powers.length + 1,
			title: this.powerInput.current.value,
			active: false
		};
		const updatedPowers = [
			...this.state.powers,
			newPower
		];

		//update state
		this.setState({ powers: updatedPowers });

		//reset state
		this.powerInput.current.value = '';
	};

	render() {
		const { classes } = this.props;
		return (
			<Container maxWidth="xs">
				<Card>
					<div className="App">
						<Typography variant="h4" component="h2" gutterBottom>
							<Header name={this.state.name} />
						</Typography>

						<div className="card-detail">
							<Typography variant="h4" component="h2" gutterBottom>
								Powers:
							</Typography>
							<form onSubmit={(event) => this.addPower(event)}>
								<input
									ref={this.powerInput}
									type="text"
									placeholder="Add your dog's powers here"
									fullWidth={true}
								/>
							</form>
							<List className={classes.root}>
								{this.state.powers.length ? (
									this.state.powers.map((power) => (
										<ListOfItem
											powerKey={power.id}
											power={power}
											title={power.title}
											toggleActivated={this.toggleActivated}
											deletePower={this.deletePower}
										/>
									))
								) : (
									`${this.state.name} has no powers`
								)}
							</List>
						</div>
						<Footer getActivePowers={this.getActivePowers} />
					</div>
				</Card>
			</Container>
		);
	}
}

const ListOfItem = (props) => {
	// console.log(props);
	return (
		//<p key={props.power.id}>
		<p key={props.powerKey}>
			<ListItem key={'power.id'} role={undefined} dense button>
				<ListItemIcon>
					<Checkbox
						type="checkbox"
						defaultChecked={props.power.active}
						onChange={() => props.toggleActivated(props.power.id)}
					/>
				</ListItemIcon>
				<ListItemText>{props.power.title}</ListItemText>
				<ListItemSecondaryAction>
					<IconButton edge="end" aria-label="trash" onClick={() => props.deletePower(props.power.id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</p>
	);
};

ListOfItem.propTypes = {
	power: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		active: PropTypes.bool.isRequired
	})
};

const Footer = (props) => {
	return <span> Active Powers: {props.getActivePowers()}</span>;
};

Footer.propTypes = {
	getActivePowers: PropTypes.func.isRequired
};

const Header = (props) => {
	return (
		<Fragment>
			<img src={logo} className="App-logo" alt="logo" />
			<h1>{props.name}</h1>
		</Fragment>
	);
};

Header.propTypes = {
	name: PropTypes.string.isRequired
};

Header.defaultProps = {
	name: 'A Dog'
};

export default withStyles(styles)(App);
