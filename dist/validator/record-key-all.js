import ValidateRecordKey from "./validatable/record/record-key";
import RecordKeyCallback from "./record-key-callback";
export default function RecordKeyAll(validator, validation, message) {
    return RecordKeyCallback({
        validator,
        handler: ValidateRecordKey,
        validation,
        message
    });
}
export default function RecordKeyAll(validator, validation, message) {
    return RecordKeyCallback({
        validator,
        handler: ValidateRecordKey,
        validation,
        message
    });
}
//# sourceMappingURL=record-key-all.js.map