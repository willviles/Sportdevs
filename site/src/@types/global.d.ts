export declare global {
  interface Window {
    __NEXT_DATA__: {
      [key: string]: any
    }
  }

  declare module '*.png' {
    const resource: string
    export = resource
  }

  declare module '*.jpg' {
    const resource: string
    export = resource
  }

  declare module '*.svg?sprite' {
    export const ReactComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>
    export default ReactComponent
  }

  declare module '*&ts-ignore' {
    const value: string
    export = value;
  }
}
