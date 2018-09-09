import * as React from "react";
import * as classNames from "classnames";

function isHeightOverflown(element: Element) {
    return element.scrollHeight > element.clientHeight;
}

function isWidthOverflown(element: Element) {
    return element.scrollWidth > element.clientWidth;
}

function isScrollAtTop(element: Element) {
    return element.scrollTop === 0;
}

function isScrollAtBottom(element: Element) {
    return element.scrollTop + element.clientHeight === element.scrollHeight;
}

function isScrollAtLeft(element: Element) {
    return element.scrollLeft === 0;
}

function isScrollAtRight(element: Element) {
    return element.scrollLeft + element.clientWidth === element.scrollWidth;
}

function shouldShowLeftShadow(element: Element) {
    return isWidthOverflown(element) && !isScrollAtLeft(element);
}

function shouldShowRightShadow(element: Element) {
    return isWidthOverflown(element) && !isScrollAtRight(element);
}

function shouldShowTopShadow(element: Element) {
    return isHeightOverflown(element) && !isScrollAtTop(element);
}

function shouldShowBottomShadow(element: Element) {
    return isHeightOverflown(element) && !isScrollAtBottom(element);
}

export interface IShadowedScrollBoxProps {
    type: "linear" | "radial";
}

export class ShadowedScrollBox extends React.Component<IShadowedScrollBoxProps, {}> {
    private boxRef: React.RefObject<HTMLDivElement>;

    public constructor(props: IShadowedScrollBoxProps) {
        super(props);
        this.boxRef = React.createRef();
    }

    public render() {
        const { type } = this.props;
        const element = this.boxRef.current;
        const isLeftShadowOn = element !== null && shouldShowLeftShadow(element);
        const isRightShadowOn = element !== null && shouldShowRightShadow(element);
        const isTopShadowOn = element !== null && shouldShowTopShadow(element);
        const isBottomShadowOn = element !== null && shouldShowBottomShadow(element);
        const baseShadowClass = "shadowed-scroll-box-shadow";
        const leftShadowClassName = `shadowed-scroll-box-left-${type}`;
        const rightShadowClassName = `shadowed-scroll-box-right-${type}`;
        const topShadowClassName = `shadowed-scroll-box-top-${type}`;
        const bottomShadowClassName = `shadowed-scroll-box-bottom-${type}`;
        const leftClassNames = classNames(baseShadowClass, leftShadowClassName, {
            "shadowed-scroll-box-invisible": !isLeftShadowOn,
        });
        const rightClassNames = classNames(baseShadowClass, rightShadowClassName, {
            "shadowed-scroll-box-invisible": !isRightShadowOn,
        });
        const topClassNames = classNames(baseShadowClass, topShadowClassName, {
            "shadowed-scroll-box-invisible": !isTopShadowOn,
        });
        const bottomClassNames = classNames(baseShadowClass, bottomShadowClassName, {
            "shadowed-scroll-box-invisible": !isBottomShadowOn,
        });
        return (
            <div className="shadowed-scroll-box">
                <div className={leftClassNames} />
                <div className={rightClassNames} />
                <div className={topClassNames} />
                <div className={bottomClassNames} />
                <div ref={this.boxRef} className="shadowed-scroll-box-scroll-container" onScroll={this.handleScroll}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    private handleScroll = () => {
        this.forceUpdate();
    };
}
