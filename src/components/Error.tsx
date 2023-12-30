import Icon from './Icon';

export default function Error() {
    return (
        <div className="error">
            <span className="error__icon">
                <Icon name="error" />
            </span>
            <span className="error__heading">
                We are encountering some network error right now! 
            </span>
            <span className="error__text">Try to reload the page couple of minutes later!</span>
        </div>
    );
}