// js from https://github.com/howtomakeaturn/React-Lightbox
// CSS from http://stackoverflow.com/questions/19064987/html-css-popup-div-on-text-click
// and http://stackoverflow.com/questions/10019797/pure-css-close-button
var LightboxModal = React.createClass({
    displayName: 'LightboxModal',

    whiteContentStyles: {
        position: 'fixed',
        top: '25%',
        left: '30%',
        right: '30%',
        backgroundColor: '#fff',
        color: '#7F7F7F',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '20px',
        boxShadow: '0 1px 5px #333',
        zIndex: '101'
    },

    blackOverlayStyles: {
        background: 'black',
        opacity: '.5',
        position: 'fixed',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        zIndex: '100'
    },

    closeTagStyles: {
        float: 'right',
        marginTop: '-30px',
        marginRight: '-30px',
        cursor: 'pointer',
        color: '#fff',
        border: '1px solid #AEAEAE',
        borderRadius: '30px',
        background: '#605F61',
        fontSize: '31px',
        fontWeight: 'bold',
        display: 'inline-block',
        lineHeight: '0px',
        padding: '11px 3px',
        textDecoration: 'none'
    },

    render: function () {
        for (var j in this.props) {
            if (j !== 'children') {
                this.props.children.props[j] = this.props[j];
            }
        }

        if (this.props.display) {
            return React.createElement(
                'div',
                null,
                React.createElement('div', { style: this.blackOverlayStyles, onClick: this.props.closeLightbox }),
                React.createElement(
                    'div',
                    { style: this.whiteContentStyles },
                    React.createElement(
                        'a',
                        { style: this.closeTagStyles, onClick: this.props.closeLightbox },
                        '×'
                    ),
                    this.props.children
                )
            );
        } else {
            return React.createElement('div', null);
        }
    }
});

var Lightbox = React.createClass({
    displayName: 'Lightbox',

    getInitialState: function () {
        return { display: false };
    },
    componentWillMount: function () {
        if (this.props.data) this.setState(this.props.data);
    },
    openLightbox: function () {
        this.setState({ display: true });
    },
    closeLightbox: function () {
        this.setState({ display: false });
    },
    setLightboxState: function (obj) {
        this.setState(obj);
    },
    render: function () {
        var childrenWithProps = React.Children.map(this.props.children,(child, i) => {
            var childProps = {
                openLightbox: this.openLightbox,
                closeLightbox: this.closeLightbox,
                setLightboxState: this.setLightboxState,
                key: i
            };
            for (var j in this.state) {
                childProps[j] = this.state[j];
            }
            var childWithProps = React.cloneElement(child, childProps);
            return childWithProps;
        }, this);

        return React.createElement(
            'div',
            null,
            childrenWithProps
        );
    }
});