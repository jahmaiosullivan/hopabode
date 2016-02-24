module Services {
    export interface IService<T> {
        find(id?:string): ArrayList<Model<T>>;
    }
}