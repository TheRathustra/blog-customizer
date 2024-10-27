import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	ArticleStateType,
	OptionType,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';

export type ArticleParamsFormProps = {
	initialSettings: ArticleStateType;
	setSettings: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { initialSettings, setSettings } = props;

	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [state, setState] = useState<ArticleStateType>(initialSettings);
	const asideRef = useRef<HTMLDivElement>(null);

	const handleChange = (key: keyof ArticleStateType, newValue: OptionType) => {
		setState((prev) => ({
			...prev,
			[key]: newValue,
		}));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setSettings(state);
	};

	const handleReset = (event: React.FormEvent) => {
		event.preventDefault();
		setSettings(defaultArticleState);
		setState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: asideRef,
		onClose: () => setIsFormOpen(false),
		onChange: setIsFormOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setIsFormOpen(!isFormOpen)}
			/>
			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={(e) => handleSubmit(e)}
					onReset={(e) => handleReset(e)}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						placeholder={defaultArticleState.fontFamilyOption.title}
						selected={state.fontFamilyOption}
						onChange={(option: OptionType) =>
							handleChange('fontFamilyOption', option)
						}
						title='Шрифт'
					/>

					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={(option: OptionType) =>
							handleChange('fontSizeOption', option)
						}
						title='Размер шрифта'
					/>

					<Select
						options={fontColors}
						placeholder={defaultArticleState.fontColor.title}
						selected={state.fontColor}
						onChange={(option: OptionType) => handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						placeholder={defaultArticleState.backgroundColor.title}
						selected={state.backgroundColor}
						onChange={(option: OptionType) =>
							handleChange('backgroundColor', option)
						}
						title='Цвет фона'
					/>

					<Select
						options={contentWidthArr}
						placeholder={defaultArticleState.contentWidth.title}
						selected={state.contentWidth}
						onChange={(option: OptionType) =>
							handleChange('contentWidth', option)
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
