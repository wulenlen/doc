## 基本类型
- number，string，boolean，T[]，object，null，undefined
```
//null和undefined是所有其他类型的子类型，可以赋值给其他类型
let s: string = undefined
```
- 联合类型：多种类型任选其一
```
type union = string | number | boolean
```
- void类型：通常用于约束函数返回值，表示函数没有返回任何东西
```
type Fn = () => void
```
- never类型：通常用于约束函数返回值，例如抛出异常的函数，永远不会结束的函数，
```
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```
- 元组类型：一个固定长度的数组，数组中的每一项元素类型都确定
```
type tuple = [string, number, boolean]
```
- any类型：ts不对该类型进行检查，该类型的数据可以赋值给任意类型
```
let s: any = sting
```
- unknown类型：在声明变量时，不知道是什么类型的情况使用该类型，在进行类型判断之后，ts就会知道相应的类型
```
let maybe: unknown;

if (maybe === true) {
  // 此时ts知道maybe是boolean类型
  const aBoolean: boolean = maybe;
}
```

## 类型别名
对已知的一些类型定义名称，方便使用
```
type 类型名称 = 类型
```

## 函数重载
对函数调用的多种情况进行声明
```
function combine(a: number, b: number): number
function combine(a: string, b: string): string
function combine(a: string | number, b: string | number): string | number {
  ...
}
```

## 枚举
### 如何定义一个枚举
```
enum 枚举名称 {
  字段名称 = 值,
  ...
}
```
**每个枚举成员默认是number类型，从0依次增加。**
```
enum Color {
  Red,   //0
  Green, //1
  Blue,  //2
}
```
若手动赋值为数字，后续成员的值为上一个成员的值加1
```
enum Enum {
  A,         //0
  B,         //1
  C = 4,     //4
  D,         //5
  E = 8,     //8
  F,         //9
}
```
### 使用枚举
枚举常用于定义一组常量，比如列表中的排序字段，定义一个枚举方便管理与使用
```
enum SortField {
  VisitCount = 'visitCount',
  UpdateAt = 'updateAt'
}
```
约束某个变量的取值范围，如：
```
let color: Color = Color.Red
```
**注意，数字枚举用作类型时，可以接受任何数字。**
```
enum Item { A, B }
let a: Item = 55  //不会报错
```
**一个枚举中，不要即有number类型，又有string类型**

## 接口的三四点

### 1.可选属性
```
interface SquareConfig {
  color?: string;
  width?: number;
}
```

### 2.只读属性
```
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error
```

### 3.动态属性
```
interface IProps {
  [index: string]: any;
}
```

### 4.extends
一个接口的成员复制到另一个接口，达到复用的效果。可继承多个接口。
```
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
```
交叉类型也可以实现继承的效果
**注意，交叉类型中避免出现相同的属性，类型却不同，否则会变成never类型**
```
interface ErrorHandling {
    success: boolean;
    error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

type ArtworksResponse = ErrorHandling & ArtworksData
// type ArtworksResponse = {
//   success: boolean;
//   error?: { message: string };
//   artworks: { title: string }[];
// }
```
## typeof
获取变量或属性的类型
```
let s = 'dddd'
let d: typeof s
```

## keyof
联合对象类型的键名
```
type Point = { x: number; y: number };
type P = keyof Point;   //type P = "x" | "y"
```
### keyof与in连用
```
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
```
## 预定义类型
<https://www.typescriptlang.org/docs/handbook/utility-types.html>
```
Partial<T>    所有属性可选
Readonly<T>   所有属性只读
Pick<T, K>    从T中选出K
Exclude<T, U>    从T中排除
Extract<T, U>  从T,U中提取相同的类型
Required<T>   所有属性必须
...
```











