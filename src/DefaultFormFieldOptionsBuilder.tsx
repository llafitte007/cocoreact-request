/* eslint-disable no-unused-vars */
import { TextFieldProps } from "./FormWidgets/TextField";
import { SelectFieldProps } from "./FormWidgets/SelectField";
import { DateFieldProps } from "./FormWidgets/DateField";
import { TimeFieldProps } from "./FormWidgets/TimeField";
import { AutoCompleteFieldProps } from "./FormWidgets/AutoCompleteField";

import {
	FormFieldOptionsBuilder as FormFieldOptionsBuilderBase,
	IFormField
} from "./core/FormField";
import IFormWidgetPropsBase from "./FormWidgets/IFormWidgetPropsBase";
import IField from "./core/types/IField";
import { slugify } from "./StringExtension";

export interface IFormWidgetFieldOptions extends IFormField {
	fullWidth?: IFormWidgetPropsBase["fullWidth"];
	color?: IFormWidgetPropsBase["color"];
	margin?: IFormWidgetPropsBase["margin"];

	autoClearAdornment?: TextFieldProps["autoClearAdornment"];
	autoClearIcon?: TextFieldProps["autoClearIcon"];
	options?: SelectFieldProps["options"] | AutoCompleteFieldProps["options"];
	MenuProps?: SelectFieldProps["MenuProps"];
	format?: DateFieldProps["format"];
	minDate?: DateFieldProps["minDate"];
	maxDate?: DateFieldProps["maxDate"];
	minutesStep?: TimeFieldProps["minutesStep"];
	groupBy?: AutoCompleteFieldProps["groupBy"];
	noOptionsText?: AutoCompleteFieldProps["noOptionsText"];
	startAdornment?: React.ReactNode;
}

export default class FormFieldOptionsBuilder<
	T
> extends FormFieldOptionsBuilderBase<T, IFormWidgetFieldOptions> {
	attachFieldToSlug(
		srcformField: IField | string,
		slugFormField: IField | string
	) {
		const srcName =
			typeof srcformField === "string" ? srcformField : srcformField.name;
		const slugName =
			typeof slugFormField === "string"
				? slugFormField
				: slugFormField.name;

		this.set(srcformField, {
			onChange: (item: T) => {
				item[slugName] = slugify(item[srcName]);
				return item;
			}
		} as IFormWidgetFieldOptions);

		this.set(slugFormField, {
			disabled: true
		} as IFormWidgetFieldOptions);

		return this;
	}
}

// TODO : make own app instance with this default settings exempe:
// position: 500,
// hidden: false,
// color: "secondary",
// autoComplete: "off",
// autoFocus: false,
// disabled: false,
// fullWidth: true,
// margin: "normal",
// required: true,
// label: field.name,
// label: capitalize(this.label),
// noOptionsText: noOptionsText(this.noOptionsText)
