type TWriteable<T> = { -readonly [P in keyof T]: T[P] };
export default TWriteable;
