




import PropTypes from 'prop-types';

function Hello({ message, name , code}){

    

   return (
        <div>
            <h className="hello">
                {message} {name} your code  is {code}
            </h>
        </div>    );
}

Hello.propTypes = {
    message: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
};

export default Hello;