import Validatable from "@dikac/t-validatable/validatable";
import Validation from "@dikac/t-boolean/validation/validation";
import ValidatablesInterface from "./validatables/validatables";
import ValidatablesParameters from "./validatables-parameters";
//
// export default Validatables;
//
// export class ValidatablesParameter<
//     RecordType extends Partial<Record<PropertyKey, Validatable>> = Partial<Record<PropertyKey, Validatable>>,
//     Boolean extends boolean = boolean
// > implements ValidatablesType<RecordType, Boolean>
// {
//
//     // readonly validatables : RecordType;
//     // readonly validation : (value:RecordType)=>Boolean;
//     readonly valid : boolean;
//
//     constructor(
//         readonly validatables : RecordType,
//         readonly validation : (value:RecordType)=>Boolean,
//         //{
//         //    validatables,
//         //    validation,
//         //} : Validation<[RecordType], Boolean> & ValidatablesInterface<RecordType>
//     ) {
//         this.validatables = validatables;
//         this.validation = validation;
//
//         this.valid = this.validation(this.validatables);
//     }
// }

// export type ValidatablesType<
//     RecordType extends Partial<Record<PropertyKey, Validatable>> = Partial<Record<PropertyKey, Validatable>>,
//     Boolean extends boolean = boolean
// > = Validatable &
//     ValidatablesInterface<RecordType> &
//     {validation : (value:RecordType)=>Boolean}
//
// export type ValidatablesArgument<
//     RecordType extends Partial<Record<PropertyKey, Validatable>> = Partial<Record<PropertyKey, Validatable>>,
//     Boolean extends boolean = boolean
// > =
//     Validatables<RecordType> &
//     // TODO CHANGE TO VALIDATOR
//     {validation : (value:RecordType)=>Boolean}

export default class ValidatablesParameter<
    RecordType extends Partial<Record<PropertyKey, Validatable>> = Partial<Record<PropertyKey, Validatable>>,
    Boolean extends boolean = boolean
> extends ValidatablesParameters<RecordType, Boolean> {

    constructor({
        validatables,
        validation,
    } : Validation<[RecordType], Boolean> & ValidatablesInterface<RecordType>) {
        super(validatables, validation);
    }
}


// namespace Validatables {
//
//     export const Parameter = ValidatablesParameter;
//     export const Object = ValidatablesObject;
//     export type Argument<
//         RecordType extends Partial<Record<PropertyKey, Validatable>> = Partial<Record<PropertyKey, Validatable>>,
//         Boolean extends boolean = boolean
//     > = ValidatablesArgument<
//         RecordType,
//         Boolean
//     >;
//
//     export type Type<
//         RecordType extends Partial<Record<PropertyKey, Validatable>> = Partial<Record<PropertyKey, Validatable>>,
//         Boolean extends boolean = boolean
//     > = ValidatablesType<
//         RecordType,
//         Boolean
//     >;
// }
