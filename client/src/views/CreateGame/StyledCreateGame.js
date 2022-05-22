import styled from 'styled-components';
import { Main } from '../../styled-components/StyledMain';
import { Container } from '../../styled-components/StyledContainer.js';

export const CREATE_MAIN = styled(Main)`
	 ;
`;

export const CREATE_GAME_CONTAINER = styled(Container)`
	.form--input,
	.form--select {
		text-align: center;
		font-size: 1.5rem;
		border-radius: 10px;
		padding: 5px;
		border: 0px;
		background-color: #ffffff;
		&::placeholder {
			color: #505352;
		}
	}

	.form--name {
		height: 30px;
	}

	.form--label {
		color: white;
		font-size: 2rem;
	}

	.error {
		color: red;
		font-size: 1.5rem;
		background-color: black;
		margin: 10px 0px;
	}

	.form {
		width: 50%;
		display: flex;
		align-items: start;
		padding: 10px 10px;
		flex-wrap: wrap;
		flex-direction: column;
	}

	.form--top {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
		text-align: center;
		align-items: center;
	}

	.form--center {
		width: 100%;
		display: flex;
		margin-top: 20px;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	.form--center-row {
		display: flex;
		width: 80%;
		justify-content: space-between;
	}

	.form--top-name,
	.form--top-description,
	.form--top-imgUrl,
	.form--center-released_date,
	.form--center-rating,
	.form--center-platforms,
	.form--center-genres {
		width: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;

		& .form--input,
		.form--textarea {
			width: 100%;
		}

		& .form--textarea {
			height: 150px;
		}
	}

	.form--center-released_date,
	.form--center-rating,
	.form--center-platforms,
	.form--center-genres {
		width: 47%;
	}
	.form--center-platforms,
	.form--center-genres {
		margin-top: 20px;
	}

	.form--buttons-container {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 5px;
		margin: 10px 0px;
	}
	.selected-button,
	.create-button {
		font-size: 1.5rem;
		font-weight: bold;
		letter-spacing: 0.5px;
		border-radius: 10px;
		padding: 5px;
		border: 0px;
		background-color: #59fcc9;
		color: black;
		cursor: pointer;
		&.platform {
			background-color: #33abff;
		}
		&.genre {
			background-color: #00ddff;
		}
	}

	.create-button {
		margin: 20px 0px;
		width: 40%;
		font-size: 1.5rem;
		font-weight: bold;
		letter-spacing: 0.5px;
		border-radius: 10px;
		padding: 5px;
		border: 0px;
		background-color: #59fcc9;
		color: black;
		cursor: pointer;
		align-self: center;
		&:disabled {
			background-color: #59fcc97d;
		}
	}

	.withError {
		border: 2px solid red;
	}

	@media (max-width: 768px) {
		.form {
			width: 100%;
		}

		.form--input,
		.selected-button,
		.create-button {
			font-size: 1.2rem;
		}

		.form--center select {
			width: min-content;
			font-size: 1.2rem;
		}
	}
`;
