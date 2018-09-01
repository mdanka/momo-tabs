declare module "slate-plain-serializer" {
    import { BlockProperties, MarkProperties, Value } from 'slate';

    export interface DeserializeOptions {
        toJson?: boolean;
        defaultBlock?: BlockProperties;
        defaultMarks?: MarkProperties[] | Set<MarkProperties>;
    }

    export interface SlatePlainSerializer {
        deserialize(string: string, options?: DeserializeOptions): Value;
        serialize(value: Value): string;
    }

    const slatePlainSerializer: SlatePlainSerializer;

    export default slatePlainSerializer;
}
