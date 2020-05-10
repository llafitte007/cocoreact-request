/* eslint-disable no-unused-vars */
import ITableField from "./ITableField";
import { IFieldSet, IField, IFieldOptionsBase } from "../IField";

export default class TableFieldOptionsBuilder<TTableField extends ITableField> {
	private _fieldset: IFieldSet<TTableField & IFieldOptionsBase>;
	private _defaultOptionsInitializer?: (options: TTableField) => TTableField;

	constructor(
		defaultOptionsInitializer?: (options: TTableField) => TTableField
	) {
		this._fieldset = new IFieldSet<TTableField & IFieldOptionsBase>();
		this._defaultOptionsInitializer = defaultOptionsInitializer;
	}

	initialize(
		fields: TTableField[] | Record<string, TTableField & IFieldOptionsBase>
	) {
		this._fieldset.initialize(fields);
		return this;
	}

	set(
		field: IField | string,
		options: Partial<TTableField & IFieldOptionsBase>
	) {
		this._fieldset.set(field, options);
		return this;
	}

	hidden(field: IField | string) {
		this._fieldset.hidden(field);
		return this;
	}

	build() {
		let fields = this._fieldset.toList() as TTableField[];
		if (this._defaultOptionsInitializer) {
			const callback = this._defaultOptionsInitializer;
			fields = fields.map((f) => {
				return callback(f);
			}) as TTableField[];
		}
		return fields;
	}
}
