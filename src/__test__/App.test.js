import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

const user = userEvent.setup()

test('initial render', () => {
  const { container } = render(<App onSubmit={jest.fn()} />);
  expect(container).toMatchSnapshot();
  expect(screen.getByRole('button')).toHaveAttribute('disabled')
});

test('partially completed', async () => {
  const { container } = render(<App onSubmit={jest.fn()} />);
  const nameInput = screen.getByTestId('firstName');

  await user.tab()
  expect(nameInput).toHaveFocus()
  await user.keyboard('mauricia');

  expect(container).toMatchSnapshot();
  expect(screen.getByRole('button')).toHaveAttribute('disabled')
});

test('invalid email', async () => {
  const { container } = render(<App onSubmit={jest.fn()} />);
  const nameInput = screen.getByTestId('firstName');
  const emailInput = screen.getByTestId('email');
  
  await user.tab()
  expect(nameInput).toHaveFocus()
  await user.keyboard('mauricia');
  
  await user.tab()
  expect(emailInput).toHaveFocus()
  await user.keyboard('mauricia@');

  expect(container).toMatchSnapshot();
  expect(screen.getByRole('button')).toHaveAttribute('disabled')
});

test('valid firstName and email', async () => {
  const { container } = render(<App onSubmit={jest.fn()} />);
  const nameInput = screen.getByTestId('firstName');
  const emailInput = screen.getByTestId('email');
  
  await user.tab()
  expect(nameInput).toHaveFocus()
  await user.keyboard('mauricia');
  
  await user.tab()
  expect(emailInput).toHaveFocus()
  await user.keyboard('mauricia@summanerd.com');

  expect(container).toMatchSnapshot();
  expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
});

test('submit valid form', async () => {
  const onSubmit = jest.fn();
  render(<App onSubmit={onSubmit} />);
  const nameInput = screen.getByTestId('firstName');
  const emailInput = screen.getByTestId('email');
  const form = screen.getByTestId('form');
  
  await user.tab()
  expect(nameInput).toHaveFocus()
  await user.keyboard('mauricia');
  
  await user.tab()
  expect(emailInput).toHaveFocus()
  await user.keyboard('mauricia@summanerd.com');

  await fireEvent.submit(form);

  expect(onSubmit).toHaveBeenCalled();
  const [[args]] = onSubmit.mock.calls
  expect(args).toEqual({firstName: 'mauricia', email: 'mauricia@summanerd.com'});
});
