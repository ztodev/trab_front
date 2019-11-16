import CPFValidate from './CPF.rule'

const Validator = {
    getMessage (field, args) {
        return 'O CPF informado é inválido'
    },
    validate (value, args) {
        return CPFValidate(value)
    }
}

export default Validator
